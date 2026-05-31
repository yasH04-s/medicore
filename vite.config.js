import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  server: {
=======
    server: {
>>>>>>> 659b0e7ed6652c7aec3d8e63baf1af600d5f529b
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
