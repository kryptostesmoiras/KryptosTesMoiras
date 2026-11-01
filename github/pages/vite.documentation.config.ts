import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: fileURLToPath(new URL('./KryptosTesMoiras/', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public/KryptosTesMoiras/', import.meta.url)),
  base: './',
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL('./dist-project-docs/', import.meta.url)),
    emptyOutDir: true,
  },
});
