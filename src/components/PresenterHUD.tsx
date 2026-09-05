import { useEffect, useState } from 'react'
import { SCENES, TOTAL_DURATION_SEC } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** 발표자 HUD: 현재/다음 Scene, 발표 메모, 경과/남은 시간 */
export function PresenterHUD() {
  const { scene, presenter, startedAt } = usePresentation()
  const [, tick] = useState(0)

  useEffect(() => {
    if (!presenter) return
    const t = setInterval(() => tick((x) => x + 1), 1000)
    return () => clearInterval(t)
  }, [presenter])

  if (!presenter) return null

  const cur = SCENES[scene - 1]
  const nxt = SCENES[scene]
  const elapsed = startedAt ? (Date.now() - startedAt) / 1000 : 0
  const remaining = TOTAL_DURATION_SEC - elapsed

  return (
    <div className="hud">
      <div className="h-col" style={{ width: 210 }}>
        <span className="h-k">Now {String(scene).padStart(2, '0')} · 권장 {fmt(cur.durationSec)}</span>
        <span className="h-v">{cur.shortTitle}</span>
        <span className="h-k" style={{ marginTop: 8 }}>Next</span>
        <span className="h-v" style={{ color: 'var(--text-mid)' }}>
          {nxt ? nxt.shortTitle : '— 끝 —'}
        </span>
      </div>
      <div className="h-col h-note">{cur.note}</div>
      <div className="h-col" style={{ alignItems: 'flex-end', width: 150 }}>
        <span className="h-k">경과</span>
        <span className="h-time">{fmt(elapsed)}</span>
        <span className="h-k" style={{ marginTop: 6 }}>남음 (20:00)</span>
        <span className={`h-time${remaining < 0 ? ' over' : ''}`}>
          {remaining < 0 ? '-' : ''}
          {fmt(Math.abs(remaining))}
        </span>
      </div>
    </div>
  )
}
