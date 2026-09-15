import { useState } from 'react'
import { Sparkle, BintangOutline, AwanBlob } from './Dekorasi'
import { simpanAkun } from '../data/kartu'

export default function LayarAkun({ onSelesai }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const bersih = username.trim()
    if (bersih.length < 3) {
      setError('Nama pemain minimal 3 huruf')
      return
    }
    simpanAkun(bersih)
    onSelesai(bersih)
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%)',
      }}
    >
      <AwanBlob style={{ position: 'absolute', top: 40, left: -20, opacity: 0.8 }} />
      <AwanBlob style={{ position: 'absolute', top: 90, right: -30, opacity: 0.6 }} width={90} height={45} />
      <Sparkle size={28} style={{ position: 'absolute', top: '18%', right: '15%' }} />
      <Sparkle size={18} style={{ position: 'absolute', bottom: '30%', left: '12%' }} color="var(--pink)" />
      <BintangOutline size={22} style={{ position: 'absolute', bottom: '22%', right: '18%' }} />

      <div style={{ fontSize: 72, marginBottom: 8 }}>🎴</div>
      <h1
        className="display"
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: 'var(--ink)',
          margin: '0 0 6px',
          textAlign: 'center',
        }}
      >
        Kartu Ajaib
      </h1>
      <p style={{ color: 'var(--ink-soft)', margin: '0 0 32px', fontWeight: 600, textAlign: 'center' }}>
        Buat namamu, lalu mulai petualangan!
      </p>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 320 }}>
        <input
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError('') }}
          placeholder="Nama pemain..."
          maxLength={16}
          autoFocus
          style={{
            width: '100%',
            padding: '16px 18px',
            fontSize: 17,
            fontWeight: 700,
            fontFamily: 'Nunito',
            borderRadius: 'var(--radius-md)',
            border: '3px solid var(--outline)',
            outline: 'none',
            background: 'var(--surface)',
            color: 'var(--ink)',
            boxShadow: 'var(--shadow-flat)',
            textAlign: 'center',
          }}
        />
        {error && (
          <p style={{ color: 'var(--red)', fontWeight: 700, fontSize: 14, marginTop: 8, textAlign: 'center' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: 18,
            padding: '16px',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'Baloo 2',
            color: '#fff',
            background: 'var(--pink)',
            borderRadius: 'var(--radius-md)',
            border: '3px solid var(--outline)',
            boxShadow: 'var(--shadow-flat)',
            transition: 'transform 0.12s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translate(3px, 3px)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'translate(0,0)')}
          onTouchStart={(e) => (e.currentTarget.style.transform = 'translate(3px, 3px)')}
          onTouchEnd={(e) => (e.currentTarget.style.transform = 'translate(0,0)')}
        >
          Mulai Bermain
        </button>
      </form>
    </div>
  )
}
