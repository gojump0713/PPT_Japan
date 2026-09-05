import { TOTAL_SCENES } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

export function ProgressBar() {
  const { scene } = usePresentation()
  return (
    <>
      <div className="progress">
        <div className="p-fill" style={{ width: `${(scene / TOTAL_SCENES) * 100}%` }} />
      </div>
      <div className="p-count">
        {String(scene).padStart(2, '0')} / {TOTAL_SCENES}
      </div>
    </>
  )
}
