import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

// Desktop, Specs tab (compact tab) — should now be FULL height
const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
await d.goto('http://localhost:4176/#specs', { waitUntil: 'networkidle' });
await d.screenshot({ path: process.env.SCRATCH + '/hero-desktop-specs.png', clip: { x: 0, y: 60, width: 1280, height: 700 } });

// Desktop, Story tab — should also be full height (unchanged)
await d.goto('http://localhost:4176/#story', { waitUntil: 'networkidle' });
await d.screenshot({ path: process.env.SCRATCH + '/hero-desktop-story.png', clip: { x: 0, y: 60, width: 1280, height: 700 } });

// Mobile, Specs tab — should still be compact strip
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto('http://localhost:4176/#specs', { waitUntil: 'networkidle' });
await m.screenshot({ path: process.env.SCRATCH + '/hero-mobile-specs.png', clip: { x: 0, y: 60, width: 390, height: 400 } });

await b.close();
