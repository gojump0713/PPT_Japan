import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const LAYERS = [
  { idx: 'L1', name: 'VDI', sub: '보안 가상 데스크톱' },
  { idx: 'L2', name: 'Policy & Security', sub: '접근권한 · 파일이동 · 세션 통제' },
  { idx: 'L3', name: 'GPU Pool', sub: '필요 시 즉시 할당' },
  { idx: 'L4', name: 'Internal + External LLM', sub: '정책 기반 AI 라우팅', top: true },
]

const CONTROLS = ['Identity', 'Session', 'File', 'Capture', 'GPU', 'AI Routing']

/** Scene 13 — Secure AI Workspace: 4-layer stack + 6 통제 포인트 */
export function Scene13({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    // 4 layers stack build 200ms stagger
    tl.from('.stack4 .layer', { y: 40, opacity: 0, stagger: 0.2, duration: 0.55 }, 0.7)
    tl.from('.ctrl-chip', { scale: 0.6, opacity: 0, transformOrigin: 'center', stagger: 0.1, duration: 0.4, ease: 'back.out(1.5)' }, 1.7)
    tl.from('.ws-label', { opacity: 0, y: 16 }, 2.4)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 5 — AX · iStation</span>
      <GoverningCopy
        top={140}
        lines={[
          <>Virtual Desktop에서</>,
          <>
            <em>Secure AI Workspace</em>로.
          </>,
        ]}
        sub="VDI + GPU + LLM — 사용자는 그 위에서 단 하나의 Workspace만 경험합니다."
      />

      <div className="stack4">
        {LAYERS.map((l) => (
          <div className={`layer${l.top ? ' top' : ''}`} key={l.idx}>
            <span className="l-idx">{l.idx}</span>
            <span className="l-name">{l.name}</span>
            <span className="l-sub">{l.sub}</span>
          </div>
        ))}
      </div>

      {/* 6 통제 포인트 */}
      <div
        style={{
          position: 'absolute',
          right: 176,
          top: 420,
          width: 460,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          alignContent: 'flex-start',
        }}
      >
        <div className="kc-sub ws-label" style={{ width: '100%', fontSize: 20, marginBottom: 4 }}>
          조직이 쥐는 6개의 통제 포인트
        </div>
        {CONTROLS.map((c) => (
          <div className="ctrl-chip" key={c}>
            <span className="dot" />
            {c}
          </div>
        ))}
      </div>
    </div>
  )
}
