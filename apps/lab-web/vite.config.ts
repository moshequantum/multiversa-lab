import { defineConfig, defaultClientConditions, defaultServerConditions } from 'vite';
import react from '@vitejs/plugin-react';

// Workspace packages (@multiversa/design-system) expose a "source" export condition that points
// at their TypeScript sources, so dev, build and the hero-shell SSR never depend on a prebuilt dist/.
export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ['source', ...defaultClientConditions],
  },
  ssr: {
    resolve: {
      conditions: ['source', ...defaultServerConditions],
    },
  },
  server: {
    port: 5174,
  },
});
