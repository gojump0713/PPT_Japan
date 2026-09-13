import { SCENES, TOTAL_DURATION_SEC } from '../content/scenes'
import { useEffect, useRef } from 'react'
import { usePresentation } from '../lib/usePresentation'

/**
 * 'O' 키로 여는 목차 오버레이.
 * 방향키로 선택 이동, Enter/클릭으로 해당 Scene 이동, O/Esc로 닫기.
 */
export function SceneOverview({ sel, onPick, onClose }: { sel: number; onPick: (n: number) => void; onClose: () => void }) {
  const { scene } = usePresentation()
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    root.current?.querySelector<HTMLButtonElement>(`[data-scene="${sel}"]`)?.focus()
  }, [sel])
  useEffect(() => () => { document.querySelector<HTMLButtonElement>('.p-count')?.focus() }, [])
  return (
    <div className="overview" role="dialog" aria-modal="true" aria-labelledby="overview-title" ref={root}
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return
        const buttons = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
        e.preventDefault()
        buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus()
      }}>
      <div className="ov-head">
        <div><div className="ov-eyebrow">DX → AX · PRESENTATION MAP</div><h2 id="overview-title">발표의 흐름을 한눈에.</h2></div>
        <div className="ov-summary">17 SCENES<span>권장 {Math.floor(TOTAL_DURATION_SEC / 60)}분 {TOTAL_DURATION_SEC % 60}초</span></div>
        <button className="ov-close" onClick={onClose} aria-label="목차 닫기">닫기 <kbd>Esc</kbd></button>
      </div>
      <div className="ov-grid">
        {SCENES.map((s) => (
          <button
            key={s.id}
            data-scene={s.id}
            aria-current={s.id === scene ? 'step' : undefined}
            className={`ov-item${s.id === scene ? ' cur' : ''}${s.id === sel ? ' sel' : ''}`}
            onClick={() => onPick(s.id)}
          >
            <div className="ov-preview">
              {s.hero && <img src={s.hero} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />}
              <span className="ov-num">{String(s.id).padStart(2, '0')}</span>
              {s.id === scene && <span className="ov-current">현재 장면</span>}
            </div>
            <div className="ov-copy"><span className="ov-ch">{s.chapter}</span><span className="ov-title">{s.shortTitle}</span></div>
          </button>
        ))}
      </div>
      <div className="ov-footer"><span><kbd>← ↑ ↓ →</kbd> 선택 <kbd>Enter</kbd> 이동</span><span><kbd>1–9</kbd> 1–9장 <kbd>Shift + 1–8</kbd> 10–17장</span><span><kbd>O / Esc</kbd> 발표로 돌아가기</span></div>
    </div>
  )
}
