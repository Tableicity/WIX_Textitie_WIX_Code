// Injects pre-rendered landing-page HTML into the built index.html so
// crawlers that don't execute JavaScript still see the real content.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(dir, '../dist');
const indexPath = path.join(dist, 'public/index.html');

const { render } = await import(
  path.join(dist, 'server/entry-server.js')
);

const html = render('/');

if (!html || !html.trim()) {
  throw new Error('Pre-render produced empty HTML output.');
}

const template = readFileSync(indexPath, 'utf8');
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  throw new Error(`Could not find ${marker} in ${indexPath}`);
}

writeFileSync(
  indexPath,
  template.replace(marker, `<div id="root">${html}</div>`),
);

// The server bundle is only needed at build time; drop it from the output.
rmSync(path.join(dist, 'server'), { recursive: true, force: true });

console.log(`Pre-rendered landing page injected into ${indexPath}`);
