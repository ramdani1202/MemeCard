import { useState } from 'react'
import { RARITAS } from '../data/kartu'
import { Sparkle, BintangOutline } from './Dekorasi'

// Punggung kartu — pola seragam untuk semua kartu tertutup
function PunggungKartu() {
  return (
    <svg viewBox="0 0 200 280" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="punggungGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8FBB" />
          <stop offset="100%" stopColor="#FF6B9D" />
        </linearGradient>
        <pattern id="polaBintang" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 8 L22 17 L31 18 L24 24 L26 33 L20 28 L14 33 L16 24 L9 18 L18 17 Z" fill="#FFFFFF" opacity="0.25" />
        </pattern>
      </defs>
      <rect x="4" y="4" width="192" height="272" rx="20" fill="url(#punggungGrad)" stroke="#3A2E52" strokeWidth="5" />
      <rect x="4" y="4" width="192" height="272" rx="20" fill="url(#polaBintang)" />
      <circle cx="100" cy="140" r="46" fill="#FFF8ED" stroke="#3A2E52" strokeWidth="5" />
      <text x="100" y="156" fontSize="46" textAnchor="middle" fontFamily="Baloo 2">✨</text>
    </svg>
  )
}

// Bagian depan kartu — konten acak sesuai kartu yang ditarik
function DepanKartu({ kartu }) {
  const rarity = RARITAS[kartu.rarity]
  return (
    <svg viewBox="0 0 200 280" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`depanGrad-${kartu.uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={rarity.warna} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="192" height="272" rx="20" fill={`url(#depanGrad-${kartu.uid})`} stroke="#3A2E52" strokeWidth="5" />

      {/* pita rarity */}
      <rect x="4" y="4" width="192" height="34" rx="0" fill={rarity.warna} />
      <path d="M4 4 H196 V38 H4 Z" fill={rarity.warna} clipPath="inset(0 round 20px 20px 0 0)" />
      <text x="100" y="27" fontSize="15" fontWeight="800" fill="#FFFFFF" textAnchor="middle" fontFamily="Baloo 2">
        {rarity.label}
      </text>

      {/* medali karakter */}
      <circle cx="100" cy="120" r="58" fill="#FFF8ED" stroke="#3A2E52" strokeWidth="5" />
      <text x="100" y="140" fontSize="64" textAnchor="middle">{kartu.emoji}</text>

      {/* nama kartu */}
      <rect x="16" y="200" width="168" height="40" rx="12" fill="#3A2E52" />
      <text x="100" y="226" fontSize="16" fontWeight="700" fill="#FFF8ED" textAnchor="middle" fontFamily="Baloo 2">
        {kartu.nama}
      </text>

      {/* bintang kekuatan dekoratif */}
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${64 + i * 36}, 254)`}>
          <path
            d="M8 0 L9.8 5.6 L15.6 5.9 L11 9.4 L12.6 15 L8 11.6 L3.4 15 L5 9.4 L0.4 5.9 L6.2 5.6 Z"
            fill={i < (rarity.label === 'Legenda' ? 3 : rarity.label === 'Epik' ? 2 : 1) ? '#FFD23F' : '#E5DCC8'}
            stroke="#3A2E52"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  )
}

export default function Kartu({ kartu, terbalik = true, onSentuh, ukuran = 'normal', animasiMasuk = false, style }) {
  const [membalik, setMembalik] = useState(false)

  function handleKlik() {
    if (membalik) return
    setMembalik(true)
    onSentuh?.()
    setTimeout(() => setMembalik(false), 700)
  }

  const lebar = ukuran === 'kecil' ? 90 : ukuran === 'besar' ? 220 : 140

  return (
    <button
      onClick={handleKlik}
      aria-label={terbalik ? 'Kartu tertutup, sentuh untuk berputar' : `Kartu ${kartu?.nama || ''}`}
      style={{
        width: lebar,
        height: lebar * 1.4,
        perspective: 800,
        background: 'transparent',
        padding: 0,
        ...style,
      }}
      className={animasiMasuk ? 'kartu-masuk' : ''}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: `rotateY(${membalik ? 180 : 0}deg) rotateZ(${membalik ? 6 : 0}deg)`,
          filter: 'drop-shadow(3px 5px 0px rgba(58,46,82,0.35))',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
          {terbalik || membalik ? <PunggungKartu /> : <DepanKartu kartu={kartu} />}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {kartu ? <DepanKartu kartu={kartu} /> : <PunggungKartu />}
        </div>
      </div>

      <style>{`
        @keyframes kartuMasuk {
          0% { opacity: 0; transform: translateY(24px) scale(0.85); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .kartu-masuk {
          animation: kartuMasuk 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </button>
  )
}
