// Browser polyfills for Node.js APIs
// This file MUST be imported before any other imports in index.tsx

import { Buffer } from 'buffer';

// Expose Buffer globally for libraries like gray-matter
globalThis.Buffer = Buffer;
(window as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
