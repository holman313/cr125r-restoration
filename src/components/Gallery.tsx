import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { TabId } from '../tabs';
import { responsiveImage } from '../responsiveImage';
import PhotoButton from './PhotoButton';

const QUILTED_PATTERN = [2, 1, 1, 2, 2];
const EVEN_PATTERN = [2, 2];
const MOBILE_PATTERN = [2, 2];

/**
 * A plain path fills a standard one-row tile. Portrait photos need `rows: 2`,
 * or the fixed row height crops them to a thin horizontal band.
 */
type GalleryPhoto = string | { src: string; rows?: number; alt?: string };

const photoSrc = (photo: GalleryPhoto) => (typeof photo === 'string' ? photo : photo.src);
const photoRows = (photo: GalleryPhoto) => (typeof photo === 'string' ? 1 : (photo.rows ?? 1));
/** A photo-specific alt text, or undefined to use the section's generic one. */
const photoAlt = (photo: GalleryPhoto) => (typeof photo === 'string' ? undefined : photo.alt);

interface GallerySection {
  id: TabId;
  title: string;
  subtitle: string;
  /**
   * Start of each photo's alt text. Not shown on the page; screen readers
   * and image search read it. Sections alternate "CR125" and "CR 125" so
   * both spellings are covered without stuffing either into every image.
   */
  altPrefix: string;
  photos: GalleryPhoto[];
  colPattern: number[];
  rowHeight: { mobile: number; desktop: number };
}

const sections: GallerySection[] = [
  {
    id: 'gallery-as-found',
    title: 'As Found',
    subtitle: 'The bike as it was when I bought it — all original, sitting since 1992.',
    altPrefix: '1990 Honda CR125 as found, all original',
    colPattern: QUILTED_PATTERN,
    rowHeight: { mobile: 200, desktop: 220 },
    photos: [
      '/photos/as-found/1990-honda-cr125-as-found-chain-side.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-pipe-side.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-swingarm-125r-decal.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-fmf-silencer.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-original-exhaust-pipe.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-seller-photo.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-seat-side-panel.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-rear-tire-chain.jpg',
      '/photos/as-found/1990-honda-cr125-as-found-frame-underside.jpg',
    ],
  },
  {
    id: 'gallery-restoration',
    title: 'The Restoration',
    subtitle: 'Bringing it back to life — one detail at a time.',
    altPrefix: 'Honda CR 125 restoration in progress',
    colPattern: QUILTED_PATTERN,
    rowHeight: { mobile: 200, desktop: 260 },
    photos: [
      '/photos/restoration/1990-honda-cr125-restoration-swingarm-decal-cleaned.jpg',
      '/photos/restoration/1990-honda-cr125-restoration-in-the-garage.jpg',
      '/photos/restoration/1990-honda-cr125-restoration-rear-suspension-removed.jpg',
      '/photos/restoration/1990-honda-cr125-restoration-swingarm-shock-linkage.jpg',
      '/photos/restoration/1990-honda-cr125-restoration-313-number-plates.jpg',
      { src: '/photos/restoration/1990-honda-cr125-restoration-pipe-refinished.jpg', rows: 2 },
      { src: '/photos/restoration/1990-honda-cr125-restoration-pipe-refinished-detail.jpg', rows: 2 },
      { src: '/photos/restoration/1990-honda-cr125-restoration-dunlop-tires.jpg', rows: 2 },
      { src: '/photos/restoration/1990-honda-cr125-restoration-new-sprockets.jpg', rows: 2 },
    ],
  },
  {
    id: 'gallery-finished',
    title: 'After Restoration',
    subtitle: 'Show-ready and running like new.',
    altPrefix: 'Restored 1990 Honda CR125',
    colPattern: EVEN_PATTERN,
    rowHeight: { mobile: 220, desktop: 300 },
    photos: [
      '/photos/finished/1990-honda-cr125-restored-chain-side.jpg',
      '/photos/finished/1990-honda-cr125-restored-pipe-side.jpg',
      '/photos/finished/1990-honda-cr125-restored-three-quarter-front.jpg',
      '/photos/finished/1990-honda-cr125-restored-three-quarter-rear.jpg',
      { src: '/photos/finished/1990-honda-cr125-restored-front.jpg', rows: 2 },
      { src: '/photos/finished/1990-honda-cr125-restored-rear.jpg', rows: 2 },
      '/photos/finished/1990-honda-cr125-restored-shroud-detail.jpg',
      '/photos/finished/1990-honda-cr125-restored-seat-pipe-detail.jpg',
      '/photos/finished/1990-honda-cr125-restored-hpp-engine-detail.jpg',
      '/photos/finished/1990-honda-cr125-restored-engine-pipe-detail.jpg',
      '/photos/finished/1990-honda-cr125-restored-cockpit.jpg',
      '/photos/finished/1990-honda-cr125-restored-pro-circuit-silencer.jpg',
      '/photos/finished/1990-honda-cr125-125-dream-race-paddock.jpg',
      '/photos/finished/1990-honda-cr125-125-dream-race-show-and-shine.jpg',
      '/photos/finished/1990-honda-cr125-restored-indoor-display.jpg',
      {
        src: '/photos/finished/seth-enslow.jpeg',
        alt: 'Seth Enslow',
      },
    ],
  },
];

interface GalleryProps {
  activeTab: TabId;
}

export default function Gallery({ activeTab }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const section = sections.find((s) => s.id === activeTab);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!section) return null;

  const cols = isMobile ? 2 : 4;
  const pattern = isMobile ? MOBILE_PATTERN : section.colPattern;
  const rowHeight = isMobile ? section.rowHeight.mobile : section.rowHeight.desktop;
  const slides = section.photos.map((photo) => ({ src: photoSrc(photo) }));

  return (
    <Box component="section" aria-label={section.title} sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700}>
          {section.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {section.subtitle}
        </Typography>
        <ImageList variant="quilted" cols={cols} gap={isMobile ? 6 : 10} rowHeight={rowHeight}>
          {section.photos.map((photo, i) => {
            const src = photoSrc(photo);
            const itemCols = pattern[i % pattern.length];
            // Tiles are full-width on phones (2-col grid, every tile spans
            // both) and ~300/600px on desktop depending on cols spanned. The
            // grid fixes each tile's box, so width/height here only inform
            // the browser's srcset choice — the layout never shifts either
            // way.
            const sizes = `(max-width: 600px) 100vw, ${itemCols >= 2 ? '600px' : '300px'}`;
            return (
              <ImageListItem key={src} cols={itemCols} rows={photoRows(photo)}>
                <PhotoButton onClick={() => setLightboxIndex(i)}>
                  <img
                    {...responsiveImage(src, sizes)}
                    alt={photoAlt(photo) ?? `${section.altPrefix}, photo ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                  />
                </PhotoButton>
              </ImageListItem>
            );
          })}
        </ImageList>
      </Container>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </Box>
  );
}
