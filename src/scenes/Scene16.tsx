import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const PRODUCTS = [
  { name: 'Dstation', sub: 'PC 가상화 (VDI)' },
  { name: 'DaaS', sub: '어디서나 안전하게' },
  { name: 'Tstation', sub: 'GPU · AI 개발환경' },
  { name: 'iStation', sub: '생성형 AI × 기업 데이터' },
  { name: 'AI Workspace', sub: '사람과 AI가 함께', hot: true },
]

/** Scene 16 — 틸론: evolution ribbon + 2001→2026 연혁 라인 */
export function Scene16({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    traceLine(tl, '.ribbon-line', { duration: 1.4, at: 0.7 })
    // 제품명 250ms stagger
    tl.from('.evo-step', { y: 26, opacity: 0, stagger: 0.25, duration: 0.5 }, 1.0)
    // 마지막 AI Workspace pulse
    tl.to('.evo-step.hot .es-node', { scale: 1.5, duration: 0.35, ease: 'power2.out' }, 2.6)
    tl.to('.evo-step.hot .es-node', { scale: 1, duration: 0.4 }, 2.95)
    tl.from('.history-line', { opacity: 0, y: 14 }, 2.4)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">TILON</span>
      <GoverningCopy
        top={150}
        lines={[
          <>우리가 만들어 온 것은 가상 PC가 아니라,</>,
          <>
            <em>일하는 환경</em>입니다.
          </>,
        ]}
        sub="2001년부터 20년+ 가상화 · 클라우드를 연구해 온 한국 소프트웨어 기업."
      />

      {/* evolution ribbon */}
      <div style={{ position: 'absolute', left: 176, right: 176, top: 560 }}>
        <svg width="1568" height="8" style={{ display: 'block', overflow: 'visible' }}>
          <path className="ribbon-line d-line" d="M 0 4 L 1568 4" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -13 }}>
          {PRODUCTS.map((p) => (
            <div className={`evo-step${p.hot ? ' hot' : ''}`} key={p.name}>
              <div className="es-node" />
              <div className="es-name" style={p.hot ? { color: 'var(--cyan-soft)' } : undefined}>{p.name}</div>
              <div className="es-sub">{p.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="history-line panel"
        style={{ position: 'absolute', left: 176, bottom: 130, display: 'flex', flexDirection: 'column', gap: 10, padding: '22px 30px', maxWidth: 1100 }}
      >
        <span style={{ fontFamily: 'var(--font-num)', fontSize: 44, fontWeight: 800, color: 'var(--text-hi)' }}>2001 → 2026</span>
        <span className="kc-sub" style={{ fontSize: 21, marginTop: 0 }}>
          이름은 바뀌어도 질문은 하나 — “사람이 가장 안전하고 자유롭게 일할 수 있는 환경.” 이제 그 질문에 AI가 더해집니다.
        </span>
      </div>
    </div>
  )
}
