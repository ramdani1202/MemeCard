import { useState, useEffect } from 'react'
import LayarAkun from './components/LayarAkun'
import LayarBeranda from './components/LayarBeranda'
import LayarBukaPaket from './components/LayarBukaPaket'
import LayarKoleksi from './components/LayarKoleksi'
import {
  ambilAkun,
  ambilKoleksi,
  tambahKeKoleksi,
  tarikPaket,
  sudahAmbilPaketGratis,
  tandaiPaketGratisTerpakai,
} from './data/kartu'

export default function App() {
  const [layar, setLayar] = useState('memuat')
  const [username, setUsername] = useState(null)
  const [koleksi, setKoleksi] = useState([])
  const [paketAktif, setPaketAktif] = useState(null)
  const [gratisSudahDiambil, setGratisSudahDiambil] = useState(false)

  useEffect(() => {
    const akun = ambilAkun()
    if (akun) {
      setUsername(akun.username)
      setKoleksi(ambilKoleksi())
      setGratisSudahDiambil(sudahAmbilPaketGratis())
      setLayar('beranda')
    } else {
      setLayar('akun')
    }
  }, [])

  function handleAkunSelesai(nama) {
    setUsername(nama)
    setLayar('beranda')
  }

  function handleBukaPaket() {
    const jumlah = gratisSudahDiambil ? 4 : 4
    const paket = tarikPaket(jumlah)
    setPaketAktif(paket)
    setLayar('bukaPaket')
  }

  function handlePaketSelesai() {
    const diperbarui = tambahKeKoleksi(paketAktif)
    setKoleksi(diperbarui)
    if (!gratisSudahDiambil) {
      tandaiPaketGratisTerpakai()
      setGratisSudahDiambil(true)
    }
    setPaketAktif(null)
    setLayar('beranda')
  }

  if (layar === 'memuat') {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ fontSize: 48 }}>🎴</div>
      </div>
    )
  }

  if (layar === 'akun') {
    return <LayarAkun onSelesai={handleAkunSelesai} />
  }

  if (layar === 'bukaPaket' && paketAktif) {
    return <LayarBukaPaket paket={paketAktif} onSelesai={handlePaketSelesai} />
  }

  if (layar === 'koleksi') {
    return <LayarKoleksi koleksi={koleksi} onKembali={() => setLayar('beranda')} />
  }

  return (
    <LayarBeranda
      username={username}
      jumlahKoleksi={koleksi.length}
      sudahAmbilGratis={gratisSudahDiambil}
      onBukaPaket={handleBukaPaket}
      onLihatKoleksi={() => setLayar('koleksi')}
    />
  )
}
