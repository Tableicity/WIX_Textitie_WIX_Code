import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';

import './index.css';

const root = document.getElementById('root')!;

// Production builds ship pre-rendered HTML inside #root; hydrate it so
// crawlers and users see the same markup. Dev serves an empty root.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
