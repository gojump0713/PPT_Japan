import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const STEPS = [
  { name: '전자정부', sub: '전산화 — 종이를 시스템으로', y: 250 },
  { name: '디지털정부', sub: '인터넷 · 모바일 행정서비스', y: 170 },
  { name: 'AI정부', sub: 'AI · Agent와 함께 일하는 정부', y: 90 },
]

/** Scene 3 — 전자→디지털→AI정부 3단 staircase + 서비스/업무환경 평행 레일 */
export function Scene03({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    // 3단계 카드 좌→우 450ms stagger (설계서)
    tl.from('.stair-card', { x: -40, opacity: 0, stagger: 0.45, duration: 0.6 }, 0.6)
    traceLine(tl, '.rail-line', { duration: 1.1, stagger: 0.2, at: 1.6 })
    tl.from('.rail-label', { opacity: 0, y: 12, stagger: 0.15 }, 2.0)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 2 — 공공</span>
      <GoverningCopy
        top={150}
        lines={[
          <>전자정부의 다음 단계는,</>,
          <>
            공무원의 <em>업무환경 자체</em>를 바꾸는 것.
          </>,
        ]}
      />

      {/* 3단 staircase */}
      <div style={{ position: 'absolute', left: 176, bottom: 330, display: 'flex', gap: 40, alignItems: 'flex-end' }}>
        {STEPS.map((s, i) => (
          <div
            key={s.name}
            className={`kcard stair-card${i === 2 ? ' glow' : ''}`}
            style={{ width: 400, position: 'relative', bottom: i * 80 }}
          >
            <div className="kc-title">{s.name}</div>
            <div className="kc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 평행 레일: 서비스 / 업무환경 → AI정부에서 합류 */}
      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        <path className="rail-line d-line dim" d="M 176 950 L 1180 950 C 1330 950 1380 800 1500 780" />
        <path className="rail-line d-line" d="M 176 1010 L 1180 1010 C 1360 1010 1400 820 1500 790" />
        <text className="rail-label d-txt sm" x="250" y="938" style={{ textAnchor: 'start' }}>행정 서비스의 디지털화</text>
        <text className="rail-label d-txt sm" x="250" y="998" style={{ textAnchor: 'start' }}>업무환경의 전환 — 온북 · DaaS</text>
        <text className="rail-label d-txt" x="1560" y="790" style={{ textAnchor: 'start', fill: 'var(--cyan-soft)' }}>AI정부</text>
      </svg>
    </div>
  )
}
