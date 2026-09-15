// Elemen SVG dekoratif bergaya anime/kartun — dipakai berulang di seluruh app
export function Sparkle({ size = 24, color = 'var(--yellow)', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M12 0 C12.5 7.5, 16.5 11.5, 24 12 C16.5 12.5, 12.5 16.5, 12 24 C11.5 16.5, 7.5 12.5, 0 12 C7.5 11.5, 11.5 7.5, 12 0 Z"
        fill={color}
      />
    </svg>
  )
}

export function BintangOutline({ size = 20, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M12 2 L14.5 9 L22 9.5 L16 14.2 L18 21.5 L12 17.3 L6 21.5 L8 14.2 L2 9.5 L9.5 9 Z"
        fill="var(--yellow)"
        stroke="var(--outline)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AwanBlob({ width = 120, height = 60, color = 'var(--surface)', style }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 60" fill="none" style={style}>
      <path
        d="M20 45 C5 45 5 25 20 22 C20 8 42 5 50 15 C58 2 82 5 82 20 C98 18 105 40 90 45 Z"
        fill={color}
        stroke="var(--outline)"
        strokeWidth="2"
      />
    </svg>
  )
}

export function GlowBurst({ size = 300, warna = 'var(--pink)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="burstGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={warna} stopOpacity="0.55" />
          <stop offset="100%" stopColor={warna} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="150" fill="url(#burstGrad)" />
    </svg>
  )
}
