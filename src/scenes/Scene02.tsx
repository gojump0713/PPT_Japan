import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, traceLine } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

/** Scene 2 — VDI/DaaS 개념: Device → Secure Access → VDI Workspace → Apps/Data */
export function Scene02({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.d-node-g', { opacity: 0, scale: 0.85, transformOrigin: 'center', stagger: 0.12, duration: 0.5 }, 0.6)
    traceLine(tl, '.d-line', { duration: 0.8, stagger: 0.12, at: 0.9 })
    tl.from('.vdi-toggle .kcard', { y: 24, opacity: 0, stagger: 0.18 }, 1.8)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.45} />
      <span className="chip-label chapter-chip">Chapter 1 — DX</span>
      <GoverningCopy
        top={150}
        lines={[
          <>사람이 업무환경으로 가는 시대에서,</>,
          <>
            <em>업무환경이 사람을 따라오는</em> 시대로.
          </>,
        ]}
        sub="VDI — 업무환경을 PC에서 분리해 데이터센터로. DaaS — 그것을 서비스로."
      />

      <svg className="diagram-svg" viewBox="0 0 1920 1080">
        {/* Devices → Secure Access → VDI → Apps/Data */}
        <g className="d-node-g">
          <rect className="d-node" x="220" y="600" width="200" height="76" rx="12" />
          <text className="d-txt" x="320" y="646">노트북</text>
          <rect className="d-node" x="220" y="700" width="200" height="76" rx="12" />
          <text className="d-txt" x="320" y="746">태블릿</text>
          <rect className="d-node" x="220" y="800" width="200" height="76" rx="12" />
          <text className="d-txt" x="320" y="846">사무실 단말</text>
        </g>
        <path className="d-line" d="M 420 638 C 540 638 560 738 660 738" />
        <path className="d-line" d="M 420 738 L 660 738" />
        <path className="d-line" d="M 420 838 C 540 838 560 738 660 738" />
        <g className="d-node-g">
          <rect className="d-node" x="660" y="690" width="240" height="96" rx="14" />
          <text className="d-txt" x="780" y="732">Secure Access</text>
          <text className="d-txt sm" x="780" y="760">인증 · 암호화 · 정책</text>
        </g>
        <path className="d-line" d="M 900 738 L 1030 738" />
        <g className="d-node-g">
          <rect className="d-node hot" x="1030" y="660" width="330" height="156" rx="18" />
          <text className="d-txt" x="1195" y="726" style={{ fontSize: 26 }}>VDI Workspace</text>
          <text className="d-txt sm" x="1195" y="762">화면만 전달 · 데이터는 중앙에</text>
        </g>
        <path className="d-line" d="M 1360 738 L 1490 738" />
        <g className="d-node-g">
          <rect className="d-node" x="1490" y="690" width="220" height="96" rx="14" />
          <text className="d-txt" x="1600" y="732">Apps · Data</text>
          <text className="d-txt sm" x="1600" y="760">중앙 데이터센터</text>
        </g>
      </svg>

      <div
        className="vdi-toggle"
        style={{ position: 'absolute', right: 176, top: 190, display: 'flex', flexDirection: 'column', gap: 16, width: 380 }}
      >
        <div className="kcard">
          <div className="kc-title">VDI</div>
          <div className="kc-sub">조직이 직접 구축하는 가상 데스크톱 인프라</div>
        </div>
        <div className="kcard glow">
          <div className="kc-title">DaaS</div>
          <div className="kc-sub">같은 경험을 클라우드 서비스로 — Desktop as a Service</div>
        </div>
      </div>
    </div>
  )
}
