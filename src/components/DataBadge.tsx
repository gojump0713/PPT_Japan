import type { CSSProperties } from 'react'

/**
 * 대형 숫자 배지. `.d-num`에 data-countup 값을 두고
 * Scene 타임라인에서 countUp() 헬퍼로 애니메이션한다.
 */
export function DataBadge({
  value,
  unit,
  label,
  small = false,
  accent = false,
  className = '',
  style,
}: {
  value: string
  unit?: string
  label: string
  small?: boolean
  accent?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`dbadge${small ? ' sm' : ''}${accent ? ' accent' : ''} ${className}`}
      style={style}
    >
      <span className="d-num">
        <span className="d-val">{value}</span>
        {unit && <span className="d-unit">{unit}</span>}
      </span>
      <span className="d-label">{label}</span>
    </div>
  )
}
