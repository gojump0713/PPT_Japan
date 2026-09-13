import { SCENES } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

export function ChapterTransition() {
  const { scene, prevScene, reducedMotion } = usePresentation()
  const current = SCENES[scene - 1]
  if (scene === prevScene || current.chapter === SCENES[prevScene - 1].chapter || reducedMotion) return null
  return (
    <div key={`${prevScene}-${scene}`} className={`chapter-transition${scene < prevScene ? ' reverse' : ''}`} aria-hidden="true">
      <div className="chapter-sweep" />
      <div className="chapter-cue"><span>{String(scene).padStart(2, '0')} / 17</span>{current.chapter}</div>
    </div>
  )
}
