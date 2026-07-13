import { defineConfig } from 'vite';

export default defineConfig({
  base: '/smart-recipe-manager/',
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
