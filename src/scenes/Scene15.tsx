import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const CONTROLS = ['Identity', 'Least Privilege', 'Isolated Workspace', 'Audit', 'Kill Switch']

/** Scene 15 — Agent 출입증: 사람 게이트 ↔ Agent sandbox visual rhyme */
export function Scene15({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.gate-card', { x: -40, opacity: 0, duration: 0.6 }, 0.7)
    tl.from('.sandbox-card', { x: 40, opacity: 0, duration: 0.6 }, 0.9)
    // badge scan line
    tl.fromTo('.scan-line', { y: 0 }, { y: 120, duration: 0.8, ease: 'power2.inOut' }, 1.5)
    // permission nodes turn green one by one
    tl.to('.perm-chip', { borderColor: 'var(--ok)', color: 'var(--text-hi)', stagger: 0.18, duration: 0.25 }, 2.0)
    tl.to('.perm-chip .dot', { background: 'var(--ok)', stagger: 0.18, duration: 0.25 }, 2.0)
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 5 — AX · Agent Security</span>
      <GoverningCopy
        top={140}
        lines={[
          <>사람에게 출입증이 필요하듯,</>,
          <>
            AI Agent에게도 <em>디지털 출입증</em>이 필요합니다.
          </>,
        ]}
      />

      <div style={{ position: 'absolute', left: 176, right: 176, top: 400, display: 'flex', gap: 40 }}>
        {/* 물리 게이트 */}
        <div className="kcard gate-card" style={{ flex: 1, minHeight: 320, position: 'relative', overflow: 'hidden' }}>
          <div className="kc-title">사람 — 사무실 출입 게이트</div>
          <div className="kc-sub">사원증 · MFA · SSO · 세션 · 감사 기록</div>
          <div
            style={{
              position: 'relative',
              margin: '36px auto 0',
              width: 170,
              height: 130,
              borderRadius: 14,
              border: '1.5px solid var(--line-dim)',
              overflow: 'hidden',
            }}
          >
            <div className="scan-line" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: 'var(--cyan)', boxShadow: '0 0 14px var(--cyan)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--text-dim)', fontSize: 16, letterSpacing: '0.08em' }}>
              BADGE SCAN
            </div>
          </div>
        </div>

        {/* Agent sandbox */}
        <div className="kcard sandbox-card glow" style={{ flex: 1.3, minHeight: 320 }}>
          <div className="kc-title">AI Agent — 격리된 디지털 Workspace</div>
          <div className="kc-sub">필요한 앱만 · 필요한 데이터만 · 모든 작업 기록</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
            {CONTROLS.map((c) => (
              <div className="ctrl-chip perm-chip" key={c}>
                <span className="dot" style={{ background: 'var(--text-faint)' }} />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="kc-sub" style={{ position: 'absolute', left: 176, bottom: 160, fontSize: 19 }}>
        Human Workspace → AI Workspace → <span style={{ color: 'var(--cyan-soft)', fontWeight: 700 }}>Human + AI Agent Workspace</span>
      </div>
    </div>
  )
}
