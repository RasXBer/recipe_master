import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure this matches the port you're trying to access
    watch: {
      usePolling: true, // Enable polling if you're having issues with file watching
    },
  },
});