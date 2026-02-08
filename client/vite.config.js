/**
 * Vite Configuration
 *
 * - React plugin for JSX/Fast Refresh support.
 * - Dev server runs on port 5173 and proxies /api requests
 *   to the Express backend at localhost:5000.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
