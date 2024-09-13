import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['jest', 'testing-library'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/shared/styles/index.scss";',
      },
    },
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    ViteImageOptimizer(),
    vitePluginSvgr({
      include: './src/**/*.svg',
      exclude: ['./public/**', './src/shared/ui/icon/assets/images/*.svg'],
      svgrOptions: {
        svgProps: { className: 'svg-icon' },
        dimensions: true,
        exportType: 'default',
        plugins: ['@svgr/plugin-jsx'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Сервер для обхода CORS (Закоментировал, пока не у всех команд настроен CORS)
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://172.17.1.79:30080',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
