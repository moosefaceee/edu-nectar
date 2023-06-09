// https://vitest.dev/config/#configuration
/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
