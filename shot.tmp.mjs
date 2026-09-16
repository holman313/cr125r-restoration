import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const d = await b.newPage({ viewport: { width: 1280, height: 800 } });
await d.goto('http://localhost:4174/#story', { waitUntil: 'networkidle' });
await d.screenshot({ path: process.env.SCRATCH + '/hero-desktop.png', clip: { x: 0, y: 60, width: 1280, height: 460 } });
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto('http://localhost:4174/#story', { waitUntil: 'networkidle' });
await m.screenshot({ path: process.env.SCRATCH + '/hero-mobile.png', clip: { x: 0, y: 60, width: 390, height: 400 } });
await b.close();
