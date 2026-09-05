import { SCENES } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

/**
 * 'O' 키로 여는 목차 오버레이.
 * 방향키로 선택 이동, Enter/클릭으로 해당 Scene 이동, O/Esc로 닫기.
 */
export function SceneOverview({ sel, onPick }: { sel: number; onPick: (n: number) => void }) {
  const { scene } = usePresentation()
  return (
    <div className="overview">
      <div className="ov-head">
        <span className="chip-label" style={{ fontSize: 20 }}>목차 — Scene Overview</span>
        <span className="ov-hint">← → ↑ ↓ 선택 · Enter 이동 · 클릭 이동 · O / Esc 닫기</span>
      </div>
      <div className="ov-grid">
        {SCENES.map((s) => (
          <button
            key={s.id}
            className={`ov-item${s.id === scene ? ' cur' : ''}${s.id === sel ? ' sel' : ''}`}
            onClick={() => onPick(s.id)}
          >
            <span className="ov-num">{String(s.id).padStart(2, '0')}</span>
            <span className="ov-ch">{s.chapter}</span>
            <span className="ov-title">{s.shortTitle}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
