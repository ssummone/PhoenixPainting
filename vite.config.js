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
        kRend: resolve(__dirname, 'silicone-rendering.html'),
        weatherproof: resolve(__dirname, 'weatherproof-sealing.html'),
        g41: resolve(__dirname, 'locations/g41.html'),
        g12: resolve(__dirname, 'locations/g12.html'),
        g3: resolve(__dirname, 'locations/g3.html'),
        g42: resolve(__dirname, 'locations/g42.html'),
        g72: resolve(__dirname, 'locations/g72.html'),
        g32: resolve(__dirname, 'locations/g32.html'),
        southside: resolve(__dirname, 'southside-sandstone-rendering.html'),
        westEnd: resolve(__dirname, 'west-end-silicone.html'),
        urban: resolve(__dirname, 'urban-wall-coatings-glasgow.html'),
        affordable: resolve(__dirname, 'affordable-rendering-glasgow.html'),
        roofs: resolve(__dirname, 'roofs.html'),
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
