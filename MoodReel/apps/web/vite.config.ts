import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Shapes of the same client:
// - default: talks to the Express API (proxied in dev, same origin in production)
// - standalone: the whole engine runs in the browser and everything is inlined into one HTML file,
//   so the site can be hosted anywhere static (GitHub Pages, a shared link) with no server
// - artifact: standalone for an embedded preview, where share links cannot carry state
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone' || mode === 'artifact';
  return {
    plugins: [react(), ...(standalone ? [viteSingleFile({ removeViteModuleLoader: true })] : [])],
    define: {
      'import.meta.env.VITE_API_MODE': JSON.stringify(standalone ? 'local' : (process.env.VITE_API_MODE ?? 'remote')),
      'import.meta.env.VITE_SHARE': JSON.stringify(mode === 'artifact' ? 'off' : 'on'),
    },
    build: {
      outDir: mode === 'artifact' ? 'dist-artifact' : standalone ? 'dist-standalone' : 'dist',
      target: 'es2022',
      sourcemap: !standalone,
      assetsInlineLimit: standalone ? 100_000_000 : 4096,
      chunkSizeWarningLimit: standalone ? 4000 : 600,
    },
    server: {
      port: 5173,
      proxy: { '/api': 'http://localhost:4000' },
    },
    preview: {
      port: 4173,
      proxy: { '/api': 'http://localhost:4000' },
    },
  };
});
