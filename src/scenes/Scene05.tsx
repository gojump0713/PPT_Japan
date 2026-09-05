import { DataBadge } from '../components/DataBadge'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, countUp } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const RING_R = 165
const RING_C = 2 * Math.PI * RING_R

// 지도형 도식 — 전국 거점 노드 (장식용 상대 좌표)
const MAP_NODES = [
  [1210, 300], [1300, 360], [1390, 320], [1480, 390], [1560, 340],
  [1250, 450], [1360, 470], [1470, 500], [1580, 460], [1300, 560],
  [1420, 590], [1530, 570], [1260, 660], [1380, 690], [1500, 660],
  [1330, 770], [1450, 780], [1560, 740], [1400, 860], [1510, 850],
] as const

/** Scene 5 — 우정사업본부: 2~3분→약30초 타이머 + 2026 차세대 DaaS 규모 */
export function Scene05({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    // 타이머 sweep 1.2초: 180초 상태 → 30초로 압축
    tl.to('.timer-ring-fg', { strokeDashoffset: RING_C * (1 - 30 / 180), duration: 1.2, ease: 'power2.inOut' }, 0.8)
    tl.from('.timer-after', { opacity: 0, scale: 0.8, transformOrigin: 'center', duration: 0.5 }, 1.6)
    tl.to('.timer-before', { opacity: 0.3, duration: 0.5 }, 1.6)
    // 지도 노드 100ms stagger 점등
    tl.from('.map-node', { opacity: 0, scale: 0, transformOrigin: 'center', stagger: 0.1, duration: 0.3 }, 1.0)
    countUp(tl, '.bd-budget .d-val', 126.7, { duration: 1.0, decimals: 1, at: 2.2 })
    countUp(tl, '.bd-users .d-val', 11000, { duration: 1.1, at: 2.4 })
    tl.from('.bd-until', { opacity: 0, y: 14 }, 2.8)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 2 — 공공 · 우정사업본부 DaaS</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            <em>2~3분 → 약 30초</em>,
          </>,
          <>운영 최적화가 체감 경험을 바꿉니다.</>,
        ]}
        sub="전국 분산 거점의 가상 데스크톱 — VDI 구축을 넘어 DaaS 서비스로."
      />

      {/* 원형 타이머 */}
      <svg width="440" height="440" style={{ position: 'absolute', left: 220, top: 400, overflow: 'visible' }}>
        <circle cx="220" cy="220" r={RING_R} fill="none" stroke="rgba(139,161,179,0.18)" strokeWidth="14" />
        <circle
          className="timer-ring-fg"
          cx="220"
          cy="220"
          r={RING_R}
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset="0"
          transform="rotate(-90 220 220)"
        />
        <text className="timer-before" x="220" y="195" textAnchor="middle" fill="var(--text-dim)" fontSize="30" fontWeight="600">
          부팅 2~3분
        </text>
        <text className="timer-after" x="220" y="262" textAnchor="middle" fill="var(--cyan-soft)" fontSize="58" fontWeight="800">
          약 30초
        </text>
      </svg>

      {/* 전국 노드 → 중앙 클라우드 */}
      <svg className="diagram-svg" viewBox="0 0 1920 1080" style={{ zIndex: 12 }}>
        {MAP_NODES.map(([x, y], i) => (
          <circle key={i} className="map-node" cx={x} cy={y} r="7" fill="var(--teal-soft)" opacity="0.85" />
        ))}
        <circle cx="1400" cy="560" r="46" fill="none" stroke="var(--cyan)" strokeWidth="2" opacity="0.7" />
        <text className="d-txt sm" x="1400" y="566" style={{ fill: 'var(--cyan-soft)' }}>DaaS</text>
      </svg>

      {/* 2026 차세대 사업 Data Badges */}
      <div style={{ position: 'absolute', left: 760, bottom: 150, display: 'flex', gap: 90, alignItems: 'flex-end' }}>
        <div className="bd-budget">
          <DataBadge small value="0" unit="억원" label="2026 차세대 우본 DaaS 사업 규모 (약)" />
        </div>
        <div className="bd-users">
          <DataBadge small value="0" unit="명" label="최대 동시접속" accent />
        </div>
        <div className="bd-until">
          <DataBadge small value="~2031" label="사업 기간 (약 5년)" />
        </div>
      </div>
    </div>
  )
}
