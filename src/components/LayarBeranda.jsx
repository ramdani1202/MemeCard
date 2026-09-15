import { Sparkle, BintangOutline, AwanBlob } from './Dekorasi'
import Kartu from './Kartu'

export default function LayarBeranda({ username, jumlahKoleksi, sudahAmbilGratis, onBukaPaket, onLihatKoleksi }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px 0' }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)' }}>Halo,</p>
          <p className="display" style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>
            {username} 👋
          </p>
        </div>
        <button
          onClick={onLihatKoleksi}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--surface)',
            border: '3px solid var(--outline)',
            borderRadius: 999,
            padding: '8px 14px',
            boxShadow: 'var(--shadow-flat)',
            fontWeight: 800,
            fontSize: 14,
            color: 'var(--ink)',
          }}
        >
          🃏 {jumlahKoleksi}
        </button>
      </div>

      <AwanBlob style={{ position: 'absolute', top: 90, left: -25, opacity: 0.7 }} width={100} height={50} />
      <Sparkle size={22} style={{ position: 'absolute', top: '20%', right: '10%' }} />
      <BintangOutline size={18} style={{ position: 'absolute', top: '38%', left: '8%' }} />
      <Sparkle size={16} color="var(--teal)" style={{ position: 'absolute', bottom: '30%', right: '14%' }} />

      {/* Tumpukan kartu pack di tengah */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <div style={{ position: 'relative', width: 160, height: 200 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: 130,
                height: 182,
                transform: `translateX(-50%) rotate(${(i - 1) * 8}deg) translateY(${i * 4}px)`,
                zIndex: i,
              }}
            >
              <Kartu terbalik ukuran="normal" style={{ width: 130 }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p className="display" style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
            {sudahAmbilGratis ? 'Paket Kartu' : 'Paket Gratis Menunggu!'}
          </p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)' }}>
            {sudahAmbilGratis ? 'Buka lagi untuk kejutan baru' : 'Ambil 4 kartu pertamamu, gratis!'}
          </p>
        </div>
      </div>

      {/* Tombol aksi utama */}
      <div style={{ padding: '0 24px 32px' }}>
        <button
          onClick={onBukaPaket}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: 19,
            fontWeight: 800,
            fontFamily: 'Baloo 2',
            color: '#fff',
            background: sudahAmbilGratis ? 'var(--teal)' : 'var(--pink)',
            borderRadius: 'var(--radius-md)',
            border: '3px solid var(--outline)',
            boxShadow: 'var(--shadow-flat-lg)',
          }}
        >
          {sudahAmbilGratis ? '✨ Buka Paket Kartu' : '🎁 Ambil 4 Kartu Gratis'}
        </button>
      </div>
    </div>
  )
}
