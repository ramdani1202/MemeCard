import { useState } from 'react'
import Kartu from './Kartu'
import { GlowBurst, Sparkle } from './Dekorasi'
import { RARITAS } from '../data/kartu'

// Tahapan: 'kipas' (4 kartu tertutup terhampar) -> 'terpilih' (satu kartu dipilih, membesar) -> 'terbuka' (reveal)
export default function LayarBukaPaket({ paket, onSelesai }) {
  const [tahap, setTahap] = useState('kipas')
  const [indexTerpilih, setIndexTerpilih] = useState(null)

  function pilihKartu(i) {
    if (tahap !== 'kipas') return
    setIndexTerpilih(i)
    setTahap('terpilih')
    setTimeout(() => setTahap('terbuka'), 550)
  }

  const kartuTerpilih = indexTerpilih !== null ? paket[indexTerpilih] : null
  const rarity = kartuTerpilih ? RARITAS[kartuTerpilih.rarity] : null

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg-soft) 0%, var(--bg) 100%)',
        padding: 24,
      }}
    >
      {tahap === 'terbuka' && rarity && <GlowBurst size={340} warna={rarity.warna} />}

      {tahap === 'kipas' && (
        <>
          <p className="display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 36, textAlign: 'center' }}>
            Pilih satu kartu untuk dibuka!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: -20 }}>
            {paket.map((k, i) => (
              <div
                key={k.uid}
                style={{
                  marginLeft: i === 0 ? 0 : -28,
                  transform: `rotate(${(i - (paket.length - 1) / 2) * 10}deg)`,
                  transition: 'transform 0.3s ease',
                  zIndex: i,
                }}
              >
                <Kartu
                  terbalik
                  ukuran="normal"
                  animasiMasuk
                  onSentuh={() => pilihKartu(i)}
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>
            Sentuh kartu untuk membuatnya berputar
          </p>
        </>
      )}

      {(tahap === 'terpilih' || tahap === 'terbuka') && kartuTerpilih && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            animation: tahap === 'terpilih' ? 'membesar 0.55s cubic-bezier(0.34,1.56,0.64,1) both' : undefined,
          }}
        >
          {tahap === 'terbuka' && (
            <>
              {[...Array(6)].map((_, i) => (
                <Sparkle
                  key={i}
                  size={14 + (i % 3) * 6}
                  color={i % 2 ? 'var(--yellow)' : rarity.warna}
                  style={{
                    position: 'absolute',
                    top: `${20 + (i * 11) % 55}%`,
                    left: `${10 + (i * 17) % 80}%`,
                    animation: `muncul 0.4s ease ${0.1 + i * 0.06}s both`,
                  }}
                />
              ))}
            </>
          )}

          <div style={{ position: 'relative' }}>
            <Kartu kartu={kartuTerpilih} terbalik={tahap === 'terpilih'} ukuran="besar" />
          </div>

          {tahap === 'terbuka' && (
            <div style={{ textAlign: 'center', animation: 'muncul 0.4s ease 0.3s both' }}>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 800, color: rarity.warna, textTransform: 'none' }}>
                {rarity.label}
              </p>
              <p className="display" style={{ margin: 0, fontSize: 24, fontWeight: 800, color: 'var(--ink)' }}>
                {kartuTerpilih.nama}
              </p>
            </div>
          )}
        </div>
      )}

      {tahap === 'terbuka' && (
        <button
          onClick={onSelesai}
          style={{
            marginTop: 36,
            padding: '14px 36px',
            fontSize: 16,
            fontWeight: 800,
            fontFamily: 'Baloo 2',
            color: '#fff',
            background: 'var(--purple)',
            borderRadius: 999,
            border: '3px solid var(--outline)',
            boxShadow: 'var(--shadow-flat)',
            animation: 'muncul 0.4s ease 0.45s both',
          }}
        >
          Lanjutkan
        </button>
      )}

      <style>{`
        @keyframes membesar {
          0% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes muncul {
          0% { opacity: 0; transform: translateY(8px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
