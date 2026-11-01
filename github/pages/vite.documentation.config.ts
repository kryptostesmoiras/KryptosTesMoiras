import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: fileURLToPath(new URL('./KryptosTesMoiras/', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public/KryptosTesMoiras/', import.meta.url)),
  base: './',
  plugins: [
    react(),
    {
      name: 'project-documentation-favicon',
      transformIndexHtml: html => html.replace('href="../favicon.svg"', 'href="./favicon.svg"'),
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'favicon.svg', source: readFileSync(new URL('./public/favicon.svg', import.meta.url)) });
      },
    },
  ],
  build: {
    outDir: fileURLToPath(new URL('./dist-project-docs/', import.meta.url)),
    emptyOutDir: true,
  },
});
