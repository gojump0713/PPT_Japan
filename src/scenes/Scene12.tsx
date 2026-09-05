import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const RISKS = ['내부자료 유출', '개인정보', '기술 IP', '비용 · 토큰 통제']

/** Scene 12 — 생성형 AI 리스크: 차단(red) → 안전 경로(cyan) */
export function Scene12({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    traceLine(tl, '.risk-line', { duration: 0.7, at: 0.7 })
    tl.from('.guardrail', { scaleY: 0, transformOrigin: 'center', duration: 0.3, ease: 'power4.out' }, 1.4)
    tl.fromTo('.guardrail', { opacity: 0.3 }, { opacity: 1, duration: 0.15, repeat: 3, yoyo: true }, 1.4)
    traceLine(tl, '.safe-line', { duration: 1.0, at: 1.9 })
    tl.from('.safe-node', { opacity: 0, scale: 0.7, transformOrigin: 'center', duration: 0.5 }, 2.5)
    tl.from('.risk-card', { y: 20, opacity: 0, stagger: 0.13, duration: 0.45 }, 1.6)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 5 — AX</span>
      <GoverningCopy
        top={140}
        lines={[
          <>막을 것인가? 허용할 것인가?</>,
          <>
            이제 질문은 <em>“어떻게 안전하게 쓸 것인가”</em>입니다.
          </>,
        ]}
        sub="직원들은 생성형 AI를 쓰고 싶어 합니다 — 하지만 내부자료를 외부 AI에 넣을 수는 없습니다."
      />

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        {/* 문서 → 외부 AI (차단) */}
        <g>
          <rect className="d-node" x="220" y="560" width="190" height="80" rx="12" />
          <text className="d-txt" x="315" y="608">내부 문서</text>
        </g>
        <path className="risk-line d-line red" d="M 410 600 L 800 600" />
        <rect className="guardrail" x="806" y="520" width="10" height="160" rx="5" fill="var(--danger)" />
        <g>
          <rect className="d-node" x="880" y="560" width="210" height="80" rx="12" opacity="0.55" />
          <text className="d-txt" x="985" y="608" opacity="0.55">외부 공개 AI</text>
        </g>
        {/* 안전 경로 */}
        <path className="safe-line d-line" d="M 315 640 C 315 830 900 830 1240 830" />
        <g className="safe-node">
          <rect className="d-node hot" x="1240" y="770" width="420" height="120" rx="16" />
          <text className="d-txt" x="1450" y="822">Governed AI Workspace</text>
          <text className="d-txt sm" x="1450" y="856">허용 경로 · 마스킹 · 정책 통제</text>
        </g>
      </svg>

      {/* 4 Risks */}
      <div
        style={{
          position: 'absolute',
          right: 176,
          top: 380,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          width: 440,
        }}
      >
        {RISKS.map((r) => (
          <div className="kcard danger risk-card" key={r} style={{ padding: '18px 20px' }}>
            <div className="kc-title" style={{ fontSize: 19 }}>{r}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
