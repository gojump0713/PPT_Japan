import { DataBadge } from '../components/DataBadge'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, countUp } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

// 행안부 2023-07-31 설명자료 — 온북 도입기관 비율 계획
const PLAN = [
  { year: '2023', pct: 20 },
  { year: '2024', pct: 30 },
  { year: '2025', pct: 80 },
  { year: '2026', pct: 85 },
  { year: '2027', pct: 90 },
]
const MAX_BAR = 430

/** Scene 4 — 행정안전부 온북: 20→90% 계단형 bar + 대형 90% count-up */
export function Scene04({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.sc-bar', { scaleY: 0, stagger: 0.16, duration: 0.55, ease: 'power2.out' }, 0.7)
    tl.from('.sc-pct', { opacity: 0, stagger: 0.16, duration: 0.3 }, 0.85)
    countUp(tl, '.big90 .d-val', 90, { duration: 1.2, at: 1.1 })
    tl.from('.onbook-note', { opacity: 0, y: 16 }, 1.9)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 2 — 공공 · 행정안전부 온북</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            <em>20% → 90%</em> :
          </>,
          <>장비 교체가 아니라 업무환경의 이동.</>,
        ]}
        sub="망분리 1인 2PC 시대를 지나 — 사무실 안팎이 동일한 보안 업무환경으로."
      />

      <div className="big90" style={{ position: 'absolute', left: 176, bottom: 260 }}>
        <DataBadge value="0" unit="%" label="온북 도입기관 비율 목표 (2027)" accent />
      </div>
      <div
        className="onbook-note kcard"
        style={{ position: 'absolute', left: 176, bottom: 150, width: 620, padding: '18px 24px' }}
      >
        <div className="kc-sub" style={{ marginTop: 0 }}>
          DaaS 구축형 · 구독형 모두 허용 — “내 자리 PC”에서 “어디서나 접속”으로
        </div>
      </div>

      <div className="stair-chart">
        {PLAN.map((p) => (
          <div className="sc-col" key={p.year}>
            <div className="sc-pct">{p.pct}%</div>
            <div className="sc-bar" style={{ height: (p.pct / 100) * MAX_BAR }} />
            <div className="sc-year">{p.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
