import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // abre el análisis en el navegador automáticamente
      filename: 'bundle-stats.html', // podés cambiar el nombre si querés
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 5173,
  },
});
