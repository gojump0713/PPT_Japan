import { DataBadge } from '../components/DataBadge'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline, countUp } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const SEC_BADGES = ['모바일 공무원증 로그인', '화면 캡처 방지', '파일 저장 제한']

/** Scene 6 — 온AI: 모바일 AI 업무 mockup + 보안 배지 + 40개 부처 */
export function Scene06({ active, meta }: SceneProps) {
  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.phone', { y: 60, opacity: 0, duration: 0.8 }, 0.6)
    tl.from('.sec-badge', { scale: 0.7, opacity: 0, transformOrigin: 'left center', stagger: 0.18, duration: 0.45, ease: 'back.out(1.6)' }, 1.8)
    countUp(tl, '.bd-min .d-val', 40, { duration: 0.9, at: 2.4 })
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 2 — 공공 · 온북에서 온AI로</span>
      <GoverningCopy
        top={150}
        lines={[
          <>
            <em>이동성 · 보안 · AI</em>,
          </>,
          <>공공 업무환경의 다음 단계.</>,
        ]}
        sub="2026-04-30 온AI 모바일 서비스 개시 — 출장 중에도 스마트폰으로 안전한 업무."
      />

      {/* Illustrative VDI session: connect → virtual desktop → open a document. */}
      <div className="phone phone-vdi" style={{ right: 420, top: 240 }} aria-label="휴대폰에서 VDI에 접속해 가상 PC와 업무 문서를 실행하는 데모 영상">
        <div className="phone-vdi-screen">
          <MediaFrame
            video="assets/video/s06_vdi_phone_demo_v01.mp4"
            poster="assets/images/s06_vdi_phone_poster_v01.png"
            active={active}
            overlay={false}
          />
        </div>
        <div className="phone-home-indicator" />
      </div>

      {/* 보안 배지 3종 */}
      <div style={{ position: 'absolute', left: 176, top: 460, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {SEC_BADGES.map((b) => (
          <div className="ctrl-chip sec-badge" key={b} style={{ width: 'fit-content', fontSize: 21, padding: '14px 26px' }}>
            <span className="dot" />
            {b}
          </div>
        ))}
        <div className="kc-sub" style={{ maxWidth: 480, marginTop: 8 }}>
          AI를 쓸수록 보안이 더 중요해진다 — 편의와 통제를 동시에 설계
        </div>
      </div>

      <div className="bd-min" style={{ position: 'absolute', left: 176, bottom: 170 }}>
        <DataBadge small value="0" unit="개 부처" label="2026 하반기 확대 계획" accent />
      </div>
    </div>
  )
}
