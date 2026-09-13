import { SCENES, TOTAL_SCENES } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

export function ProgressBar({ onOverview }: { onOverview: () => void }) {
  const { scene } = usePresentation()
  return (
    <>
      <div className="progress">
        <div className="p-fill" style={{ width: `${(scene / TOTAL_SCENES) * 100}%` }} />
      </div>
      <button className="p-count" onClick={onOverview} aria-label="목차 열기 (O)">
        <span className="p-current">{String(scene).padStart(2, '0')}</span>
        <span>/ {TOTAL_SCENES}</span><span className="p-chapter">{SCENES[scene - 1].chapter}</span>
        <span className="p-open">목차 ↗</span>
      </button>
    </>
  )
}
