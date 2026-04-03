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
import type { TabId } from './NavBar';

const QUILTED_PATTERN = [2, 1, 1, 2, 2];
const EVEN_PATTERN = [2, 2];
const MOBILE_PATTERN = [2, 2];

interface GallerySection {
  id: TabId;
  title: string;
  subtitle: string;
  photos: string[];
  colPattern: number[];
  rowHeight: { mobile: number; desktop: number };
}

const sections: GallerySection[] = [
  {
    id: 'gallery-as-found',
    title: 'As Found',
    subtitle: 'The bike as it was when I bought it — all original, sitting since 1992.',
    colPattern: QUILTED_PATTERN,
    rowHeight: { mobile: 200, desktop: 220 },
    photos: [
      '/photos/as-found/20250708_173939.jpg',
      '/photos/as-found/20250708_173953.jpg',
      '/photos/as-found/511550695_705881208746655_7654873925645486782_n.jpg',
      '/photos/as-found/511691016_727930883073436_2255052552686165886_n.jpg',
      '/photos/as-found/511853656_726849399726159_726664144942546534_n.jpg',
      '/photos/as-found/512014606_1421811542282879_4787133338647080129_n.jpg',
      '/photos/as-found/512111523_998182165724339_3908359442190371356_n.jpg',
      '/photos/as-found/512562778_1253709202951492_3420004356951000960_n.jpg',
      '/photos/as-found/512574166_1247098590212931_8903988289943527610_n.jpg',
    ],
  },
  {
    id: 'gallery-restoration',
    title: 'The Restoration',
    subtitle: 'Bringing it back to life — one detail at a time.',
    colPattern: QUILTED_PATTERN,
    rowHeight: { mobile: 200, desktop: 260 },
    photos: [
      '/photos/restoration/20250712_163005.jpg',
      '/photos/restoration/20250719_140016.jpg',
      '/photos/restoration/20250719_191631.jpg',
      '/photos/restoration/20250719_191637.jpg',
      '/photos/restoration/20250727_180742.jpg',
    ],
  },
  {
    id: 'gallery-finished',
    title: 'After Restoration',
    subtitle: 'Show-ready and running like new.',
    colPattern: EVEN_PATTERN,
    rowHeight: { mobile: 220, desktop: 300 },
    photos: [
      '/photos/finished/20250821_153547.jpg',
      '/photos/finished/20250821_153612.jpg',
      '/photos/finished/20250821_153620.jpg',
      '/photos/finished/20250823_112313.jpg',
      '/photos/finished/20250823_145657.jpg',
      '/photos/finished/20251018_135845.jpg',
      '/photos/finished/IMG_0372.jpeg',
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
  const slides = section.photos.map((src) => ({ src }));

  return (
    <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700}>
          {section.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          {section.subtitle}
        </Typography>
        <ImageList variant="quilted" cols={cols} gap={isMobile ? 6 : 10} rowHeight={rowHeight}>
          {section.photos.map((src, i) => {
            const itemCols = pattern[i % pattern.length];
            return (
              <ImageListItem
                key={src}
                cols={itemCols}
                onClick={() => setLightboxIndex(i)}
                sx={{ cursor: 'pointer', '&:hover img': { opacity: 0.85, transition: 'opacity 0.2s' } }}
              >
                <img
                  src={src}
                  alt={`${section.title} photo ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                />
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
