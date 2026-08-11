import { useState, type FormEvent } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/**
 * Private comment form. Submissions POST to a Google Apps Script web app
 * that appends a row to a Google Sheet the owner owns. Nothing shows on the
 * public site — the owner reviews the sheet and curates from there.
 *
 * The endpoint is expected in `VITE_COMMENTS_URL`. When it's not set the
 * component renders nothing, so the site is safe to redeploy without the
 * Google side wired up yet.
 *
 * Submission uses URLSearchParams so the request stays a simple form POST —
 * no JSON preflight, no CORS response headers required from Apps Script.
 * `mode: 'no-cors'` means we can't read the response body; we treat any
 * completed fetch as success, which matches Apps Script behaviour for a
 * well-formed submit.
 */
const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL as string | undefined;

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export default function LeaveNote() {
  if (!COMMENTS_URL) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot; humans leave this blank
  const [status, setStatus] = useState<Status>('idle');

  const disabled = status === 'submitting';

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('submitting');

    // A filled honeypot means a bot: pretend success so it moves on, but
    // don't actually POST. Real submissions from humans always come in with
    // this field empty.
    if (website) {
      setStatus('sent');
      return;
    }

    const params = new URLSearchParams();
    params.set('name', name);
    params.set('email', email);
    params.set('message', message);

    try {
      await fetch(COMMENTS_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors',
      });
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Leave a Note
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Say hi, share a memory of a 1990 CR, or ask a question. Notes go straight to the owner
        — nothing shows on the site.
      </Typography>

      {status === 'sent' ? (
        <Alert severity="success" variant="outlined" sx={{ maxWidth: 520 }}>
          Thanks — your note is in.
        </Alert>
      ) : (
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 520 }}
        >
          <TextField
            label="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            size="small"
            fullWidth
          />
          <TextField
            label="Email (optional, only if you'd like a reply)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            size="small"
            fullWidth
          />
          <TextField
            label="Note"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            required
            multiline
            minRows={3}
            fullWidth
          />

          {/* Honeypot: hidden from humans, but a bot filling every input hits it. */}
          <Box
            component="input"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            sx={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
          />

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disabled || !message.trim()}
            >
              {status === 'submitting' ? 'Sending…' : 'Send'}
            </Button>
          </Box>

          {status === 'error' && (
            <Alert severity="error" variant="outlined">
              Couldn't send — try again in a moment.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
