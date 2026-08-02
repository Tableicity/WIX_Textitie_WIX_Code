import { renderToString } from 'react-dom/server';

import App from './App';

/**
 * Build-time pre-rendering entry point.
 * Renders the app for a given URL so the built index.html
 * contains real content for crawlers that don't run JavaScript.
 */
export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}
