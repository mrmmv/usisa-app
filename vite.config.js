import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 3003,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});





