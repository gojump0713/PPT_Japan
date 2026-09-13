import { DataBadge } from '../components/DataBadge'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, countUp } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const RING_R = 165
const RING_C = 2 * Math.PI * RING_R

/** Scene 5 — 우정사업본부: 2~3분→약30초 타이머 + 2026 차세대 DaaS 규모 */
export function Scene05({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    // 타이머 sweep 1.2초: 180초 상태 → 30초로 압축
    tl.to('.timer-ring-fg', { strokeDashoffset: RING_C * (1 - 30 / 180), duration: 1.2, ease: 'power2.inOut' }, 0.8)
    tl.from('.timer-after', { opacity: 0, scale: 0.8, transformOrigin: 'center', duration: 0.5 }, 1.6)
    tl.to('.timer-before', { opacity: 0.3, duration: 0.5 }, 1.6)
    tl.from('.business-metrics', { opacity: 0, y: 26, duration: 0.6 }, 1.0)
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

      {/* 2026 차세대 사업 Data Badges */}
      <div className="business-metrics">
        <div className="business-heading">2026 차세대 DaaS 사업</div>
        <div className="bd-budget">
          <DataBadge small value="0" unit="억원" label="2026 차세대 우본 DaaS 사업 규모 (약)" />
        </div>
        <div className="bd-users">
          <DataBadge small value="0" unit="명" label="최대 동시접속" accent />
        </div>
        <div className="bd-until">
          <DataBadge small value="~2031" label="사업 기간 (약 5년)" />
        </div>
        <div className="business-status">KT클라우드 우선협상대상자<br />틸론 최신 DaaS 적용</div>
      </div>
    </div>
  )
}
