import Kartu from './Kartu'

export default function LayarKoleksi({ koleksi, onKembali }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px' }}>
        <button
          onClick={onKembali}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--surface)',
            border: '3px solid var(--outline)',
            boxShadow: 'var(--shadow-flat)',
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          ←
        </button>
        <h2 className="display" style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
          Koleksiku ({koleksi.length})
        </h2>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 20px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          justifyItems: 'center',
        }}
      >
        {koleksi.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--ink-soft)', fontWeight: 600, marginTop: 40 }}>
            Belum ada kartu. Yuk buka paket pertamamu! 🎁
          </p>
        )}
        {koleksi.map((k, i) => (
          <Kartu key={k.uid + i} kartu={k} terbalik={false} ukuran="kecil" />
        ))}
      </div>
    </div>
  )
}
