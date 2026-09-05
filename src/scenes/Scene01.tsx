import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const ERAS = [
  { year: '2005', label: 'PC가 있는 곳이 사무실' },
  { year: '2015', label: '인터넷 · 모바일 · 클라우드' },
  { year: '2026', label: 'AI와 함께 일하는 방식' },
  { year: 'NEXT', label: '?' },
]

/** Scene 1 — 오프닝: 3시대 match cut + 연도 타임라인 + 질문 */
export function Scene01({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    // 영상 시작 0.7초 뒤 텍스트 reveal (지시서 §7)
    revealCopy(tl, 0.7)
    tl.from('.gcopy', { scale: 1.2, duration: 1.1, ease: 'power3.out' }, 0.7)
    traceLine(tl, '.et-line', { duration: 1.4, at: 1.0 })
    tl.from('.et-item', { y: 18, opacity: 0, stagger: 0.22, duration: 0.55 }, 1.2)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.25} />
      <span className="chip-label chapter-chip">Opening</span>
      <GoverningCopy
        center
        top={380}
        lines={[
          <>AI 시대,</>,
          <>
            우리는 <em>어떤 환경</em>에서
          </>,
          <>일하게 될까요?</>,
        ]}
        sub="일하는 방식의 대전환 — DX를 넘어 AX로"
      />
      <div className="era-timeline">
        <svg width="1568" height="8" style={{ display: 'block', overflow: 'visible' }}>
          <line className="et-line" x1="0" y1="4" x2="1568" y2="4" stroke="var(--line-dim)" strokeWidth="2" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
          {ERAS.map((e) => (
            <div className="et-item" key={e.year} style={{ textAlign: 'center', minWidth: 180 }}>
              <div className={`et-year${e.year === 'NEXT' ? ' hot' : ''}`}>{e.year}</div>
              <div className="et-label">{e.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
