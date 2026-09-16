import { PHOTO_MANIFEST } from './photoManifest';

/**
 * Responsive-image props for a photo under public/photos, driven by the
 * generated manifest (see scripts/photo-variants.mjs).
 *
 * Two shapes, because MUI's `<Box component="img">` treats `width` and
 * `height` as *style* props — spreading `width={2000}` onto a Box sets CSS
 * `width: 2000px` and breaks the layout — so only a native `<img>` can take
 * the HTML width/height attributes:
 *
 *   - `responsiveImage(src, sizes)` → src, srcSet, sizes, width, height.
 *     For native `<img>`. The width/height attrs let the browser reserve the
 *     box before the file arrives (no layout shift).
 *
 *   - `srcSetProps(src, sizes)` → src, srcSet, sizes only.
 *     For MUI Box images. Reserve the box with CSS `aspectRatio` in `sx`
 *     instead; same no-layout-shift outcome, no fight with MUI's prop system.
 *
 * Unknown paths (anything not in the manifest — user uploads, logos outside
 * public/photos) fall back to a plain `src`, so callers can use these
 * unconditionally.
 */
export function responsiveImage(src: string, sizes: string) {
  const meta = PHOTO_MANIFEST[src];
  if (!meta) return { src };
  return { src, srcSet: buildSrcSet(src, meta.widths, meta.w), sizes, width: meta.w, height: meta.h };
}

export function srcSetProps(src: string, sizes: string) {
  const meta = PHOTO_MANIFEST[src];
  if (!meta) return { src };
  return { src, srcSet: buildSrcSet(src, meta.widths, meta.w), sizes };
}

function buildSrcSet(src: string, widths: number[], fullWidth: number): string {
  return widths.map((w) => `${w === fullWidth ? src : variantUrl(src, w)} ${w}w`).join(', ');
}

/** `/photos/x/foo.jpg` + 480 → `/photos/x/foo-w480.jpg` (mirrors the script). */
function variantUrl(src: string, w: number): string {
  const dot = src.lastIndexOf('.');
  return `${src.slice(0, dot)}-w${w}${src.slice(dot)}`;
}
