import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const MAJORS = [
  { name: '경영학과', sw: 'SPSS · 통계 분석', gpu: false, x: 1080, y: 300 },
  { name: '기계공학과', sw: 'AutoCAD · Inventor', gpu: true, x: 1520, y: 420 },
  { name: 'AI · SW 학과', sw: 'Python · CUDA', gpu: true, x: 1500, y: 720 },
  { name: '일반 전공', sw: '일반 노트북으로 접속', gpu: false, x: 1060, y: 830 },
]

/** Scene 8 — 제주대학교: 중앙 VDI cloud + 전공별 radial 카드 */
export function Scene08({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.vdi-cloud', { scale: 0.7, opacity: 0, transformOrigin: 'center', duration: 0.7 }, 0.6)
    traceLine(tl, '.major-line', { duration: 0.7, stagger: 0.12, at: 1.0 })
    tl.from('.major-card', { scale: 0.85, opacity: 0, transformOrigin: 'center', stagger: 0.15, duration: 0.5 }, 1.3)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 3 — 대학 · 제주대학교</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            <em>PC 성능</em>이 학생의
          </>,
          <>학습 기회를 결정하지 않는 캠퍼스.</>,
        ]}
        sub="하나의 VDI에서 전공별 SW와 자원을 — 모든 학과에 고성능 PC는 필요 없습니다."
      />

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        {MAJORS.map((m) => (
          <path
            key={m.name}
            className="major-line d-line dim"
            d={`M 1290 570 L ${m.x + 150} ${m.y + 55}`}
          />
        ))}
        <g className="vdi-cloud">
          <circle cx="1290" cy="570" r="105" fill="var(--bg-panel-solid)" stroke="var(--cyan)" strokeWidth="2" />
          <text className="d-txt" x="1290" y="562" style={{ fontSize: 27 }}>JNU</text>
          <text className="d-txt" x="1290" y="598" style={{ fontSize: 23, fill: 'var(--cyan-soft)' }}>VDI Cloud</text>
        </g>
      </svg>

      {MAJORS.map((m) => (
        <div
          key={m.name}
          className={`kcard major-card${m.gpu ? ' glow' : ''}`}
          style={{ position: 'absolute', left: m.x, top: m.y, width: 300, padding: '20px 24px', zIndex: 16 }}
        >
          <div className="kc-title" style={{ fontSize: 22 }}>
            {m.name}
            {m.gpu && <span style={{ marginLeft: 10, fontSize: 15, color: 'var(--cyan-soft)', letterSpacing: '0.08em' }}>GPU</span>}
          </div>
          <div className="kc-sub" style={{ fontSize: 17 }}>{m.sw}</div>
        </div>
      ))}
    </div>
  )
}
