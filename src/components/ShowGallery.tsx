import { useEffect, useRef, useState, type FormEvent } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/**
 * Live gallery of visitor submissions during the event weekend: a form to
 * upload a photo + message, a wall of what's been submitted so far.
 *
 * Direct-publish — submissions appear on the gallery immediately. Moderation
 * is post-hoc: the owner deletes rows from the Google Sheet (and the file
 * from Drive) to remove anything they don't want live. Setting a photo's
 * row to hidden or deleting it removes it on the next page fetch.
 *
 * Endpoint is the same Apps Script URL as the private note form
 * (VITE_COMMENTS_URL) — the script routes by the `kind` parameter, and the
 * gallery uses its `doGet` for the read side.
 */
const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL as string | undefined;

interface GalleryItem {
  timestamp: string;
  name: string;
  message: string;
  url: string;
}

type SubmitStatus = 'idle' | 'preparing' | 'submitting' | 'sent' | 'error';

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;

/**
 * Resize and re-encode a phone photo before upload. Original files run 3–5MB;
 * base64 in a form POST would push each submission past 4MB and choke the
 * script on flaky show wifi. Client-side compression lands them at 200–500KB
 * with no visible quality loss at gallery size.
 */
async function resizePhoto(file: File): Promise<{ dataUrl: string; mime: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(bitmap, 0, 0, w, h);
  const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  return { dataUrl, mime: 'image/jpeg' };
}

/** Strip the `data:image/jpeg;base64,` prefix — Apps Script wants raw base64. */
function stripDataUrl(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

export default function ShowGallery() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!COMMENTS_URL) return;
    (async () => {
      try {
        const res = await fetch(`${COMMENTS_URL}?kind=gallery`, { method: 'GET' });
        const data = (await res.json()) as GalleryItem[];
        setItems(data);
      } catch {
        setFetchError(true);
        setItems([]);
      }
    })();
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0] ?? null;
    setFile(chosen);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(chosen ? URL.createObjectURL(chosen) : null);
  };

  const reset = () => {
    setName('');
    setMessage('');
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !COMMENTS_URL) return;
    setStatus('preparing');

    try {
      const { dataUrl, mime } = await resizePhoto(file);
      const photo = stripDataUrl(dataUrl);

      setStatus('submitting');
      const params = new URLSearchParams();
      params.set('kind', 'gallery');
      params.set('name', name);
      params.set('message', message);
      params.set('photo', photo);
      params.set('mime', mime);

      await fetch(COMMENTS_URL, { method: 'POST', body: params, mode: 'no-cors' });

      // No-cors hides the response body, so we can't use the returned URL
      // directly. Optimistically add the submission using the local preview
      // so the visitor sees it appear instantly; the next page load will
      // replace it with the server-hosted version.
      const optimistic: GalleryItem = {
        timestamp: new Date().toISOString(),
        name: name.trim(),
        message: message.trim(),
        url: dataUrl,
      };
      setItems((prev) => [optimistic, ...(prev ?? [])]);
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const submitting = status === 'preparing' || status === 'submitting';

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Selfie Time
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 620 }}>
          Snap a photo with the bike, add a note. It lands here in our gallery dedicated to the
          125 Dream Race.
        </Typography>

        <Alert severity="info" variant="outlined" sx={{ mb: 4, maxWidth: 620 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            A couple of requests before you upload:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2.5, m: 0 }}>
            <li>Please stand beside the bike, not on it.</li>
            <li>Keep photos appropriate — anything that isn't will be taken down immediately.</li>
          </Typography>
        </Alert>

        {status === 'sent' ? (
          <Alert
            severity="success"
            variant="outlined"
            sx={{ maxWidth: 620, mb: 4 }}
            action={
              <Button color="inherit" size="small" onClick={() => setStatus('idle')}>
                Post another
              </Button>
            }
          >
            Thank you — your photo is up.
          </Alert>
        ) : (
          <Box
            component="form"
            onSubmit={submit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 620, mb: 5 }}
          >
            <Button
              variant="outlined"
              component="label"
              disabled={submitting}
              sx={{ alignSelf: 'flex-start' }}
            >
              {file ? 'Change photo' : 'Choose a photo'}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={onFile}
              />
            </Button>

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 320,
                  borderRadius: 1,
                  alignSelf: 'flex-start',
                  bgcolor: 'background.paper',
                }}
              />
            )}

            <TextField
              label="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              size="small"
              fullWidth
            />
            <TextField
              label="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
              size="small"
              multiline
              minRows={2}
              fullWidth
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting || !file}
              >
                {status === 'preparing'
                  ? 'Preparing…'
                  : status === 'submitting'
                    ? 'Posting…'
                    : 'Post'}
              </Button>
              {submitting && <CircularProgress size={20} />}
            </Box>

            {status === 'error' && (
              <Alert severity="error" variant="outlined">
                Couldn't post — try again in a moment.
              </Alert>
            )}
          </Box>
        )}

        <Typography variant="h5" fontWeight={700} sx={{ mt: 2, mb: 2 }}>
          From today
        </Typography>

        {items === null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {fetchError
              ? "Couldn't load the gallery — try refreshing."
              : 'Nothing here yet — be the first.'}
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            {items.map((item, i) => (
              <Card
                key={`${item.timestamp}-${i}`}
                variant="outlined"
                sx={{ bgcolor: 'background.paper' }}
              >
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={item.message || `Photo from ${item.name || 'a visitor'}`}
                  sx={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                />
                <CardContent>
                  {item.name && (
                    <Typography variant="overline" sx={{ color: 'error.main', fontWeight: 700, display: 'block' }}>
                      {item.name}
                    </Typography>
                  )}
                  {item.message && <Typography variant="body2">{item.message}</Typography>}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
