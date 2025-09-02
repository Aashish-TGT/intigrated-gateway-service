import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/consent': 'http://localhost:3001',
      '/access-receipt': 'http://localhost:3001'
    }
  }
})
