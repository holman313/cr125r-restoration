/**
 * Build step: turn the single-page app into one static HTML file per tab.
 *
 * Runs after `vite build` (browser bundle -> dist/) and
 * `vite build --ssr` (render function -> dist-ssr/). For each tab it renders
 * the page to HTML, inlines the MUI styles that page uses, and rewrites the
 * <head> with that page's own title, description, canonical URL and
 * structured data. My Story becomes dist/index.html; every other tab becomes
 * dist/<slug>.html, which Vercel serves at /<slug> (cleanUrls in
 * vercel.json).
 *
 * Search engines then get each page's full text in the HTML itself, instead
 * of one near-empty page that only fills in after JavaScript runs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://www.1990cr125revival.com';
const DIST = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');

const { render, PRERENDER_TABS, TAB_META, tabToPath } = await import(pathToFileURL(SSR_ENTRY).href);
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replace exactly one match, or fail the build — a silent miss would ship wrong SEO tags. */
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, pattern.flags.replace('g', '') + 'g'));
  if (!matches || matches.length !== 1) {
    throw new Error(`prerender: expected exactly one ${label} in index.html, found ${matches ? matches.length : 0}`);
  }
  return html.replace(pattern, () => replacement);
}

const metaTag = (attr, key, value) => `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;

for (const tab of PRERENDER_TABS) {
  const { title, description } = TAB_META[tab];
  const pagePath = tabToPath(tab);
  const url = SITE + pagePath;
  const { html, styles } = render(tab);

  let page = template;
  page = replaceOnce(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, 'root div');
  page = replaceOnce(page, /<\/head>/, `${styles}\n  </head>`, '</head>');
  page = replaceOnce(page, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`, 'title');
  page = replaceOnce(page, /<meta\s+name="description"[\s\S]*?\/>/, metaTag('name', 'description', description), 'description');
  page = replaceOnce(page, /<meta\s+property="og:url"[\s\S]*?\/>/, metaTag('property', 'og:url', url), 'og:url');
  page = replaceOnce(page, /<meta\s+property="og:title"[\s\S]*?\/>/, metaTag('property', 'og:title', title), 'og:title');
  page = replaceOnce(page, /<meta\s+property="og:description"[\s\S]*?\/>/, metaTag('property', 'og:description', description), 'og:description');
  page = replaceOnce(page, /<meta\s+name="twitter:title"[\s\S]*?\/>/, metaTag('name', 'twitter:title', title), 'twitter:title');
  page = replaceOnce(page, /<meta\s+name="twitter:description"[\s\S]*?\/>/, metaTag('name', 'twitter:description', description), 'twitter:description');
  page = replaceOnce(page, /<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${escapeAttr(url)}" />`, 'canonical');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    name: title,
    url,
    mainEntityOfPage: url,
    image: `${SITE}/og-image.jpg`,
    description,
  };
  // `<` escaped so text can never close the <script> element early.
  const jsonLdText = JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c');
  page = replaceOnce(
    page,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${jsonLdText}\n    </script>`,
    'JSON-LD',
  );

  const outFile = pagePath === '/' ? 'index.html' : `${pagePath.slice(1)}.html`;
  fs.writeFileSync(path.join(DIST, outFile), page);
  console.log(`prerendered ${pagePath.padEnd(20)} -> dist/${outFile}  (${(page.length / 1024).toFixed(0)} KB)`);
}

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
