import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/news-explorers-kids-app/',
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
  server: {
        allowedHosts: ['9e2942466baf.ngrok-free.app'], // add your ngrok host here
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})