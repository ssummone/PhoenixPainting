import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    minify: 'terser',
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        renderingRepairs: resolve(__dirname, 'rendering-repairs.html'),
        kRend: resolve(__dirname, 'k-rend.html'),
        weatherproof: resolve(__dirname, 'weatherproof-sealing.html'),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    open: true,
  },
});
