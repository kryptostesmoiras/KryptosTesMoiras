import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        site: fileURLToPath(new URL('./index.html', import.meta.url)),
        documentation: fileURLToPath(new URL('./KryptosTesMoiras/index.html', import.meta.url)),
      },
    },
  },
});
