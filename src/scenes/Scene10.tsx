import gsap from 'gsap'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const NODES = ['Device', 'VDI', 'GPU', 'Data', 'AI']
// 거버닝 카피(좌상단, 최대 x≈1256)와 겹치지 않도록 우측 하단에 배치
const CX = 1360
const CY = 640
const R = 230

// 노드 좌표 미리 계산 — JSX 렌더링과 GSAP svgOrigin에서 공유
const POS = NODES.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
})

/** Scene 10 — AI Native Campus: 5-node orbit → merge */
export function Scene10({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl, rootEl) => {
    // SVG는 GSAP 기본 변환 원점이 bbox 좌상단 — 노드 중심으로 고정해야 궤도가 어긋나지 않는다
    rootEl.querySelectorAll<SVGGElement>('.orbit-node').forEach((el, i) => {
      gsap.set(el, { svgOrigin: `${POS[i].x} ${POS[i].y}` })
    })
    gsap.set(rootEl.querySelector('.center-node'), { svgOrigin: `${CX} ${CY}` })

    revealCopy(tl)
    tl.from('.center-node', { scale: 0.7, opacity: 0, duration: 0.6 }, 0.6)
    traceLine(tl, '.orbit-ring', { duration: 1.2, at: 0.8 })
    // tracing이 dasharray를 덮어쓰므로 종료 후 점선 궤도로 복원
    tl.set('.orbit-ring', { strokeDasharray: '6 8', strokeDashoffset: 0 }, 2.0)
    tl.from('.orbit-node', { opacity: 0, scale: 0.5, stagger: 0.12, duration: 0.45 }, 1.2)
    // merge pulse — 반드시 scale 1로 복귀 (0.92로 끝나면 링과 어긋남)
    tl.to('.orbit-node', { scale: 0.9, duration: 0.4, ease: 'power2.inOut' }, 2.6)
    tl.to('.orbit-node', { scale: 1, duration: 0.45, ease: 'power2.out' }, 3.0)
    tl.to('.center-node', { scale: 1.08, duration: 0.35, ease: 'power2.out' }, 2.7)
    tl.to('.center-node', { scale: 1, duration: 0.4 }, 3.05)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 3 — 대학</span>
      <GoverningCopy
        top={150}
        lines={[
          <>Device + VDI + GPU + Data + AI</>,
          <>
            = <em>AI Native Campus</em>
          </>,
        ]}
        sub="핵심은 ChatGPT 계정 배포가 아니라 — 사람 · 데이터 · SW · GPU · AI가 하나의 환경으로 연결되는 것."
      />

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        <circle className="orbit-ring" cx={CX} cy={CY} r={R} fill="none" stroke="rgba(56, 200, 232, 0.5)" strokeWidth="2" strokeDasharray="6 8" />
        <g className="center-node">
          <circle cx={CX} cy={CY} r="92" fill="var(--bg-panel-solid)" stroke="var(--cyan)" strokeWidth="2" />
          <text className="d-txt" x={CX} y={CY - 6} style={{ fontSize: 22 }}>Campus</text>
          <text className="d-txt" x={CX} y={CY + 24} style={{ fontSize: 20, fill: 'var(--cyan-soft)' }}>Workspace</text>
        </g>
        {NODES.map((n, i) => (
          <g className="orbit-node" key={n}>
            <circle cx={POS[i].x} cy={POS[i].y} r="56" fill="var(--bg-panel-solid)" stroke="var(--line-dim)" strokeWidth="1.5" />
            <text className="d-txt" x={POS[i].x} y={POS[i].y + 7} style={{ fontSize: 19 }}>{n}</text>
          </g>
        ))}
      </svg>

      <div className="kc-sub" style={{ position: 'absolute', left: 176, bottom: 170, width: 640, fontSize: 22 }}>
        제주대학교와 서강대학교는 — 이 미래 캠퍼스의 서로 다른 조각입니다.
      </div>
    </div>
  )
}
