import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

// 30대 중 GPU 활성 PC (설명용 시나리오 — Illustrative)
const GPU_ACTIVE = new Set([2, 7, 9, 14, 16, 21, 25, 28])

/** Scene 7 — 대학 컴퓨터실: 30 PC grid, GPU 유휴 시각화 */
export function Scene07({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.pc', { opacity: 0, scale: 0.6, stagger: { each: 0.035, from: 'start' }, duration: 0.35 }, 0.6)
    tl.to('.pc.idle', { opacity: 0.38, duration: 0.6 }, 2.0)
    tl.from('.q-card', { y: 30, opacity: 0, duration: 0.6 }, 2.4)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 3 — 대학</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            학생 30명 = <em>GPU PC 30대</em>가
          </>,
          <>정답일까요?</>,
        ]}
        sub="AI 실습에는 Python · CUDA · Framework — 그리고 GPU가 필요합니다."
      />

      <div className="pc-grid">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className={`pc ${GPU_ACTIVE.has(i) ? 'gpu' : 'idle'}`}>
            {GPU_ACTIVE.has(i) ? 'GPU' : 'idle'}
          </div>
        ))}
        <span className="tag-illustrative" style={{ right: 0, bottom: -42 }}>
          Illustrative example
        </span>
      </div>

      <div
        className="kcard q-card"
        style={{ position: 'absolute', left: 176, bottom: 170, width: 700 }}
      >
        <div className="kc-title" style={{ color: 'var(--cyan-soft)' }}>
          VDI × GPU 가상화
        </div>
        <div className="kc-sub">
          수업이 없는 시간, GPU는 논다 — 성능 자체를 필요한 사람에게, 필요한 시간만큼.
        </div>
      </div>
    </div>
  )
}
