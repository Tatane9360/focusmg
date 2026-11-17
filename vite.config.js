import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// Chaque fichier .html à la racine devient une page du site
const pages = Object.fromEntries(
  readdirSync(root).filter((f) => f.endsWith('.html')).map((f) => [f.slice(0, -5), resolve(root, f)]),
);

// <!-- @include header.html --> est remplacé par src/partials/header.html (les partials peuvent s'imbriquer)
const include = (html) =>
  html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_, file) =>
    include(readFileSync(resolve(root, 'src/partials', file), 'utf8')),
  );

const htmlInclude = {
  name: 'html-include',
  transformIndexHtml: { order: 'pre', handler: include },
  handleHotUpdate({ file, server }) {
    if (file.includes('partials')) server.ws.send({ type: 'full-reload' });
  },
};

export default defineConfig({
  plugins: [tailwindcss(), htmlInclude],
  build: { rollupOptions: { input: pages } },
});
