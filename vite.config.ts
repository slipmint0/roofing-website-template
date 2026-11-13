import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR can be disabled via the DISABLE_HMR env var.
      // File watching is disabled when DISABLE_HMR=true to avoid unnecessary reloads.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
