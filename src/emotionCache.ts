import createCache from '@emotion/cache';

/**
 * One Emotion cache config shared by the build-time render and the browser.
 * The `key` must match on both sides: the pre-rendered <style> tags carry
 * it, and the browser cache recognises and reuses them on hydration instead
 * of re-injecting every MUI style.
 *
 * `prepend` puts MUI's styles first in <head>, so any plain CSS added later
 * wins without needing !important.
 */
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
