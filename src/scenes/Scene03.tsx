import { Fragment } from 'react'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const STEPS = [
  {
    era: '전산화',
    name: '전자정부',
    sub: '종이 문서를 시스템으로',
    detail: '행정 전산화의 출발',
    h: 300,
  },
  {
    era: '인터넷 · 모바일',
    name: '디지털정부',
    sub: '언제 어디서나 행정서비스',
    detail: '서비스는 디지털이 되었지만, 공무원은 여전히 특정 PC 앞에',
    h: 400,
  },
  {
    era: 'AI · Agent',
    name: 'AI정부',
    sub: '행정 서비스 × 업무환경의 통합',
    detail: '온북 · DaaS로 업무환경 자체를 전환',
    h: 500,
    hot: true,
  },
]

/** Scene 3 — 전자→디지털→AI정부: 좌→우 상승하는 3단 계단 패널 */
export function Scene03({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    // 계단 패널이 좌→우 450ms 간격으로 아래에서 솟아오름
    tl.from('.gov-step', { y: 80, opacity: 0, stagger: 0.45, duration: 0.65, ease: 'power3.out' }, 0.6)
    tl.from('.gov-arrow', { opacity: 0, x: -14, stagger: 0.45, duration: 0.4 }, 1.1)
    // AI정부 패널 glow pulse
    tl.fromTo(
      '.gov-step.hot',
      { boxShadow: '0 0 0 rgba(56,200,232,0)' },
      { boxShadow: '0 0 46px rgba(56,200,232,0.35)', duration: 0.6 },
      2.2,
    )
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.55} />
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

      <div
        style={{
          position: 'absolute',
          left: 176,
          right: 176,
          bottom: 140,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 26,
        }}
      >
        {STEPS.map((s, i) => (
          <Fragment key={s.name}>
            {i > 0 && (
              <div
                className="gov-arrow"
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: STEPS[i - 1].h / 2,
                  fontSize: 46,
                  fontWeight: 700,
                  color: 'var(--cyan)',
                  lineHeight: 1,
                }}
              >
                →
              </div>
            )}
            <div
              className={`kcard gov-step${s.hot ? ' hot glow' : ''}`}
              style={{
                flex: 1,
                height: s.h,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: '30px 34px',
              }}
            >
              <span className="chip-label" style={{ alignSelf: 'flex-start', fontSize: 16 }}>
                {s.era}
              </span>
              <div
                className="kc-title"
                style={{ fontSize: 40, ...(s.hot ? { color: 'var(--cyan-soft)' } : {}) }}
              >
                {s.name}
              </div>
              <div className="kc-sub" style={{ fontSize: 22, marginTop: 0, color: 'var(--text-hi)' }}>
                {s.sub}
              </div>
              <div className="kc-sub" style={{ fontSize: 19, marginTop: 'auto' }}>
                {s.detail}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
