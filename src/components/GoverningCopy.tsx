import type { CSSProperties, ReactNode } from 'react'

/**
 * 거버닝 카피. 의미 단위(g-reveal span)로 나눠 전달하면
 * Scene 타임라인에서 `.g-reveal`을 stagger reveal한다.
 */
export function GoverningCopy({
  lines,
  sub,
  center = false,
  top = 120,
  style,
}: {
  lines: ReactNode[]
  sub?: ReactNode
  center?: boolean
  top?: number
  style?: CSSProperties
}) {
  return (
    <div className={`gcopy${center ? ' center' : ''}`} style={{ top, ...style }}>
      <span className="g-line">
        {lines.map((l, i) => (
          <span className="g-reveal g-copy-line" key={i}>
            {l}
          </span>
        ))}
      </span>
      {sub && <span className="g-sub g-reveal">{sub}</span>}
    </div>
  )
}
