import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PENTING: ganti '/kartu-ajaib/' dengan nama repo GitHub kamu, contoh:
// jika repo kamu bernama "memecard-game", ubah jadi '/memecard-game/'
// jika deploy ke domain custom (bukan github.io/nama-repo), ubah jadi '/'
const BASE_PATH = '/MemeCard/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    VitePWA({
      // registerType 'autoUpdate' = service worker baru langsung aktif
      // begitu terdeteksi, tanpa perlu user klik apa pun
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Kartu Ajaib',
        short_name: 'KartuAjaib',
        description: 'Game koleksi kartu ajaib — buka pack, kumpulkan kartu langka!',
        theme_color: '#FF6B9D',
        background_color: '#FFF8ED',
        display: 'standalone',
        orientation: 'portrait',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Auto-update: cek update setiap kali app dibuka/fokus,
        // dan network-first untuk file JS/CSS supaya versi baru
        // langsung ketarik begitu kamu push ke GitHub
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gambar-kartu',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'aset-app' }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
