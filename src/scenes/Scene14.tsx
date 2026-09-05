import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const LOOP = ['Goal', 'Plan', 'Tool', 'Action', 'Review']
const CX = 1400
const CY = 620
const R = 190

const STAGES = [
  { name: 'Chat', sub: '질문에 답하는 AI' },
  { name: 'Agent', sub: '목표를 받아 계획하는 AI' },
  { name: 'Action', sub: '브라우저 · 파일 · 시스템을 직접 실행' },
]

/** Scene 14 — AI Agent: Chat→Agent→Action + 5-node loop */
export function Scene14({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.stage-card', { x: -30, opacity: 0, stagger: 0.25, duration: 0.5 }, 0.7)
    traceLine(tl, '.loop-ring', { duration: 1.6, at: 1.4 })
    tl.from('.loop-node', { opacity: 0, scale: 0.5, transformOrigin: 'center', stagger: 0.12, duration: 0.4 }, 1.8)
    tl.from('.agent-q', { opacity: 0, y: 18 }, 2.8)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 5 — AX · AI Agent</span>
      <GoverningCopy
        top={140}
        lines={[
          <>
            Chat → Agent → <em>Action</em>
          </>,
        ]}
        sub="AI가 답하는 시대에서 — AI가 일하는 시대로."
      />

      <div style={{ position: 'absolute', left: 176, top: 380, display: 'flex', flexDirection: 'column', gap: 18, width: 540 }}>
        {STAGES.map((s, i) => (
          <div className={`kcard stage-card${i === 2 ? ' glow' : ''}`} key={s.name}>
            <div className="kc-title">{s.name}</div>
            <div className="kc-sub">{s.sub}</div>
          </div>
        ))}
        <div className="kc-sub agent-q" style={{ fontSize: 18, marginTop: 10 }}>
          새로운 질문 — “Agent에게 우리 PC와 시스템을 <em style={{ color: 'var(--cyan-soft)', fontStyle: 'normal' }}>어디까지</em> 열어줄 것인가?”
        </div>
      </div>

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        <circle className="loop-ring" cx={CX} cy={CY} r={R} fill="none" stroke="var(--cyan)" strokeWidth="2" opacity="0.65" />
        {LOOP.map((n, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / LOOP.length
          const x = CX + R * Math.cos(a)
          const y = CY + R * Math.sin(a)
          return (
            <g className="loop-node" key={n} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="52" fill="var(--bg-panel-solid)" stroke="var(--line-dim)" strokeWidth="1.5" />
              <text className="d-txt" x={x} y={y + 6} style={{ fontSize: 18 }}>{n}</text>
            </g>
          )
        })}
        <text className="d-txt sm" x={CX} y={CY + 6}>Agent Loop</text>
      </svg>
    </div>
  )
}
