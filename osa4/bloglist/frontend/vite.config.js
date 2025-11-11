import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { globals } from 'vitest';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['**/*.test.{js,jsx}'], // files -> include
    environmentOptions: {
      jsdom: {
        globals: {
          ...globals.vitest,
        },
      },
    },
  },
});
