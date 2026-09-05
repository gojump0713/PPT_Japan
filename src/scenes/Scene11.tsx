import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const INDUSTRIES = [
  { name: '의료', need: '환자정보 — 민감정보 보호', who: '의료진은 병동을 이동' },
  { name: '제조', need: '설계도면 — 기술 IP 보호', who: '한일 엔지니어가 동일 Workspace 접속' },
  { name: '금융', need: '규제 · 감사 대응', who: '담당자는 어디서나 안전하게' },
]

/** Scene 11 — 산업 공통 원리: 3분할 triptych + 중앙 Data Vault */
export function Scene11({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.ind-panel', { y: 40, opacity: 0, stagger: 0.22, duration: 0.6 }, 0.7)
    tl.from('.vault', { scale: 0.7, opacity: 0, transformOrigin: 'center', duration: 0.6, ease: 'back.out(1.4)' }, 1.6)
    // vault lock pulse
    tl.to('.vault', { boxShadow: '0 0 46px rgba(56,200,232,0.45)', duration: 0.5, yoyo: true, repeat: 1 }, 2.2)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.45} />
      <span className="chip-label chapter-chip">Chapter 4 — 산업</span>
      <GoverningCopy
        top={140}
        lines={[
          <>
            <em>Move people.</em> Keep data secure.
          </>,
        ]}
        sub="데이터는 움직이지 않고, 사람은 움직인다 — 산업이 다른데 요구는 하나입니다."
      />

      <div style={{ position: 'absolute', left: 176, right: 176, top: 400, display: 'flex', gap: 28 }}>
        {INDUSTRIES.map((ind) => (
          <div className="kcard ind-panel" key={ind.name} style={{ flex: 1, minHeight: 240 }}>
            <div className="kc-title" style={{ fontSize: 30, color: 'var(--cyan-soft)' }}>{ind.name}</div>
            <div className="kc-sub" style={{ fontSize: 18, marginTop: 16 }}>{ind.need}</div>
            <div className="kc-sub" style={{ fontSize: 16 }}>{ind.who}</div>
          </div>
        ))}
      </div>

      <div
        className="kcard vault"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 150,
          width: 460,
          textAlign: 'center',
          borderColor: 'var(--cyan)',
        }}
      >
        <div className="kc-title" style={{ fontSize: 24 }}>🔒 Data Vault</div>
        <div className="kc-sub">민감 데이터는 안전한 중앙 환경에 머문다</div>
      </div>
    </div>
  )
}
