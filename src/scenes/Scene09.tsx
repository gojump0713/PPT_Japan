import { useRef } from 'react'
import { GoverningCopy } from '../components/GoverningCopy'
import { MediaFrame } from '../components/MediaFrame'
import { useSceneTimeline } from '../lib/useSceneTimeline'
import { revealCopy, type SceneProps } from './types'

const SLOTS = [
  { label: '오전 — 수업', cls: 'on' },
  { label: '오후 — 연구', cls: 'warm' },
  { label: '야간 — 프로젝트', cls: 'on' },
]

/** Scene 9 — 서강대학교: 24h timeline 따라 GPU pool이 그룹별로 재배분 */
export function Scene09({ active, meta }: SceneProps) {
  const poolRef = useRef<HTMLDivElement>(null)

  const root = useSceneTimeline(active, (tl) => {
    revealCopy(tl)
    tl.from('.tblock', { scaleX: 0, transformOrigin: 'left center', stagger: 0.25, duration: 0.5 }, 0.7)
    tl.from('.gt', { opacity: 0, scale: 0.6, stagger: 0.04, duration: 0.3 }, 1.0)
    // 시간대별 재배분: 타일 색 그룹이 수업→연구→프로젝트로 순환
    SLOTS.forEach((slot, s) => {
      tl.call(
        () => {
          const rootEl = poolRef.current?.closest('.scene') ?? document
          const tiles = poolRef.current?.querySelectorAll('.gt')
          tiles?.forEach((t, i) => {
            t.classList.remove('on', 'warm')
            if (i % 3 === s) t.classList.add(slot.cls)
          })
          const label = rootEl.querySelector('.slot-label')
          if (label) label.textContent = slot.label
        },
        [],
        1.8 + s * 1.1,
      )
    })
  })

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      <MediaFrame video={meta.video} poster={meta.hero} active={active} dim={0.5} />
      <span className="chip-label chapter-chip">Chapter 3 — 대학 · 서강대학교</span>
      <GoverningCopy
        top={150}
        lines={[
          <>GPU는 특정 PC의 부품이 아니라,</>,
          <>
            <em>필요한 순간 꺼내 쓰는 자원</em>으로.
          </>,
        ]}
        sub="Tstation — 드라이버 · CUDA · 라이브러리 설치 없이, 접속 즉시 표준화된 AI 개발환경."
      />

      {/* 24h timeline */}
      <div style={{ position: 'absolute', left: 176, top: 470, width: 700 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {SLOTS.map((s) => (
            <div
              key={s.label}
              className="tblock"
              style={{
                flex: 1,
                height: 54,
                borderRadius: 10,
                border: '1px solid var(--line-dim)',
                background: 'var(--bg-panel)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 17,
                fontWeight: 600,
                color: 'var(--text-mid)',
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 15, color: 'var(--text-dim)' }}>
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
        <div className="chip-label" style={{ marginTop: 40 }}>
          Elastic Allocation — <span className="slot-label">오전 — 수업</span>
        </div>
      </div>

      {/* GPU pool */}
      <div ref={poolRef} className="gpu-pool" style={{ position: 'absolute', right: 176, top: 430 }}>
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i} className={`gt${i % 3 === 0 ? ' on' : ''}`}>
            GPU
          </div>
        ))}
      </div>
      <span className="tag-illustrative" style={{ right: 176, top: 690 }}>
        Resource reallocation concept
      </span>
    </div>
  )
}
