import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*build: {
    outDir: '../backend/wwwroot/' // Place it nicely for ASP.NET
  }*/
  server: {
    port: 4009, // Forwarded in devcontainer.json runArgs.
    host: true
  }
})
