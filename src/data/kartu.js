// Data kartu contoh — nanti kamu tinggal ganti "gambar" dengan
// path ke gambar asli kamu di /public/kartu/namafile.png setelah upload ke GitHub
export const RARITAS = {
  UMUM: { label: 'Umum', warna: '#8FB8E8', berat: 55 },
  LANGKA: { label: 'Langka', warna: '#4ECDC4', berat: 28 },
  EPIK: { label: 'Epik', warna: '#8B2FC9', berat: 13 },
  LEGENDA: { label: 'Legenda', warna: '#FFD23F', berat: 4 },
}

export const DAFTAR_KARTU = [
  { id: 'k01', nama: 'Kelinci Petir', rarity: 'UMUM', emoji: '🐰' },
  { id: 'k02', nama: 'Kucing Api', rarity: 'UMUM', emoji: '🐱' },
  { id: 'k03', nama: 'Naga Kecil', rarity: 'LANGKA', emoji: '🐲' },
  { id: 'k04', nama: 'Rubah Bulan', rarity: 'LANGKA', emoji: '🦊' },
  { id: 'k05', nama: 'Phoenix Muda', rarity: 'EPIK', warna: '#FF6B9D', emoji: '🔥' },
  { id: 'k06', nama: 'Serigala Bintang', rarity: 'EPIK', emoji: '🐺' },
  { id: 'k07', nama: 'Naga Pelangi', rarity: 'LEGENDA', emoji: '🌈' },
  { id: 'k08', nama: 'Dewa Guntur Mini', rarity: 'LEGENDA', emoji: '⚡' },
]

function pilihRaritasAcak() {
  const total = Object.values(RARITAS).reduce((a, r) => a + r.berat, 0)
  let roll = Math.random() * total
  for (const [key, r] of Object.entries(RARITAS)) {
    if (roll < r.berat) return key
    roll -= r.berat
  }
  return 'UMUM'
}

export function tarikKartuAcak() {
  const rarity = pilihRaritasAcak()
  const kandidat = DAFTAR_KARTU.filter(k => k.rarity === rarity)
  const kartu = kandidat[Math.floor(Math.random() * kandidat.length)] || DAFTAR_KARTU[0]
  return { ...kartu, uid: `${kartu.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }
}

export function tarikPaket(jumlah = 4) {
  return Array.from({ length: jumlah }, tarikKartuAcak)
}

const KEY_AKUN = 'kartu-ajaib:akun'
const KEY_KOLEKSI = 'kartu-ajaib:koleksi'

export function simpanAkun(username) {
  localStorage.setItem(KEY_AKUN, JSON.stringify({ username, dibuatPada: Date.now() }))
}

export function ambilAkun() {
  try {
    const raw = localStorage.getItem(KEY_AKUN)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function ambilKoleksi() {
  try {
    const raw = localStorage.getItem(KEY_KOLEKSI)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function tambahKeKoleksi(kartuBaru) {
  const koleksi = ambilKoleksi()
  const diperbarui = [...koleksi, ...kartuBaru]
  localStorage.setItem(KEY_KOLEKSI, JSON.stringify(diperbarui))
  return diperbarui
}

export function sudahAmbilPaketGratis() {
  return localStorage.getItem('kartu-ajaib:paket-gratis') === 'ya'
}

export function tandaiPaketGratisTerpakai() {
  localStorage.setItem('kartu-ajaib:paket-gratis', 'ya')
}
