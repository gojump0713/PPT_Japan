import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const STEPS = ['PC', 'VDI', 'DaaS', 'GPU Workspace', 'AI Workspace', 'Human + AI Agent']

/** Scene 17 — Closing: 6-step evolution timeline + 마무리 메시지 */
export function Scene17({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl, 0.7)
    traceLine(tl, '.close-line', { duration: 1.5, at: 1.0 })
    // 각 단계 250ms 간격 점등
    tl.from('.evo-step', { y: 22, opacity: 0, stagger: 0.25, duration: 0.5 }, 1.2)
    tl.from('.close-msg', { opacity: 0, y: 20, duration: 0.8 }, 3.0)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.35} />
      <span className="chip-label chapter-chip">Closing</span>
      <GoverningCopy
        center
        top={220}
        lines={[
          <>DX를 넘어, <em>AX</em>로.</>,
        ]}
        sub="PC를 바꾸는 것이 아니라 — 일하는 환경을 바꾸는 것."
      />

      {/* 6-step evolution */}
      <div style={{ position: 'absolute', left: 176, right: 176, top: 560 }}>
        <svg width="1568" height="8" style={{ display: 'block', overflow: 'visible' }}>
          <path className="close-line d-line" d="M 0 4 L 1568 4" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -13 }}>
          {STEPS.map((s, i) => (
            <div className={`evo-step${i === STEPS.length - 1 ? ' hot' : ''}`} key={s}>
              <div className="es-node" />
              <div className="es-name" style={{ fontSize: 19, ...(i === STEPS.length - 1 ? { color: 'var(--cyan-soft)' } : {}) }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="close-msg"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 190,
          textAlign: 'center',
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: '0.01em',
          color: 'var(--text-hi)',
          textShadow: '0 2px 24px rgba(5,14,24,0.7)',
        }}
      >
        Work without borders. <span style={{ color: 'var(--cyan-soft)' }}>AI with governance.</span>
        <div style={{ marginTop: 18, fontSize: 20, fontWeight: 400, color: 'var(--text-mid)' }}>
          ご清聴ありがとうございました — 감사합니다
        </div>
      </div>
    </div>
  )
}
