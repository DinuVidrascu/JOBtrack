import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'JOBtrack - Job Tracker',
    short_name: 'JOBtrack',
    description: 'Monitorizează-ți aplicațiile pentru joburi în timp real',
    theme_color: '#3b82f6',
    background_color: '#f8fafc',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA(pwaOptions)
  ],
})
