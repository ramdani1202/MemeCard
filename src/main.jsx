import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// --- AUTO UPDATE ---
// Fungsi ini dari vite-plugin-pwa: begitu ada file baru di server
// (karena kamu sudah push ke GitHub & GitHub Pages/hosting sudah build ulang),
// service worker lama otomatis diganti dengan yang baru, TANPA
// user perlu uninstall app atau clear cache Chrome secara manual.
// Cukup app ditutup lalu dibuka lagi (atau ada notifikasi refresh).
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // Versi baru terdeteksi -> langsung terapkan update
    updateSW(true)
  },
  onOfflineReady() {
    console.log('App siap dipakai offline')
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
