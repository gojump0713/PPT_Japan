import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const NODES = ['Device', 'VDI', 'GPU', 'Data', 'AI']
const CX = 1250
const CY = 590
const R = 250

/** Scene 10 — AI Native Campus: 5-node orbit → merge */
export function Scene10({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.center-node', { scale: 0.7, opacity: 0, transformOrigin: 'center', duration: 0.6 }, 0.6)
    traceLine(tl, '.orbit-ring', { duration: 1.2, at: 0.8 })
    tl.from('.orbit-node', { opacity: 0, scale: 0.5, stagger: 0.12, duration: 0.45 }, 1.2)
    // merge pulse
    tl.to('.orbit-node', { scale: 0.92, duration: 0.4, ease: 'power2.inOut' }, 2.6)
    tl.to('.center-node', { scale: 1.08, duration: 0.35, ease: 'power2.out' }, 2.7)
    tl.to('.center-node', { scale: 1, duration: 0.4 }, 3.05)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 3 — 대학</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            Device + VDI + GPU + Data + AI
          </>,
          <>
            = <em>AI Native Campus</em>
          </>,
        ]}
        sub="핵심은 ChatGPT 계정 배포가 아니라 — 사람 · 데이터 · SW · GPU · AI가 하나의 환경으로 연결되는 것."
      />

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        <circle className="orbit-ring" cx={CX} cy={CY} r={R} fill="none" stroke="var(--line-dim)" strokeWidth="1.5" strokeDasharray="6 8" />
        <g className="center-node">
          <circle cx={CX} cy={CY} r="92" fill="var(--bg-panel-solid)" stroke="var(--cyan)" strokeWidth="2" />
          <text className="d-txt" x={CX} y={CY - 6} style={{ fontSize: 22 }}>Campus</text>
          <text className="d-txt" x={CX} y={CY + 24} style={{ fontSize: 20, fill: 'var(--cyan-soft)' }}>Workspace</text>
        </g>
        {NODES.map((n, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length
          const x = CX + R * Math.cos(a)
          const y = CY + R * Math.sin(a)
          return (
            <g className="orbit-node" key={n} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="56" fill="var(--bg-panel-solid)" stroke="var(--line-dim)" strokeWidth="1.5" />
              <text className="d-txt" x={x} y={y + 7} style={{ fontSize: 19 }}>{n}</text>
            </g>
          )
        })}
      </svg>

      <div className="kc-sub" style={{ position: 'absolute', left: 176, bottom: 170, width: 560, fontSize: 19 }}>
        제주대학교와 서강대학교는 — 이 미래 캠퍼스의 서로 다른 조각입니다.
      </div>
    </div>
  )
}
