import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser', // Use terser for better minification
    cssMinify: true,
    assetsInlineLimit: 4096, // Inline small assets
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    open: true,
  },
});
