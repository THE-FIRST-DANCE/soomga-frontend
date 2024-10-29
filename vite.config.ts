import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        manualChunks: {
          editor: ['react-quill', 'quill-image-resize-module-ts'],
          calendar: ['react-big-calendar'],
          vendor: ['lodash'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react-quill', 'react-big-calendar'],
  },
})
