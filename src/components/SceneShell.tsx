import type { ReactNode } from 'react'
import type { SceneMeta } from '../content/scenes'
import { SourceChip } from './SourceChip'
import { usePresentation } from '../lib/usePresentation'

/**
 * Scene 공통 래퍼: crossfade + 2~3% depth zoom 전환, 출처 chip.
 * mounted 상태에서 active만 시각적으로 노출된다.
 */
export function SceneShell({
  meta,
  active,
  children,
}: {
  meta: SceneMeta
  active: boolean
  children: ReactNode
}) {
  const { scene, prevScene, reducedMotion } = usePresentation()
  const direction = scene >= prevScene ? 1 : -1
  return (
    <section
      className="scene"
      id={`scene-${String(meta.id).padStart(2, '0')}`}
      data-active={active}
      aria-hidden={!active}
      style={{
        opacity: active ? 1 : 0,
        animation: active && !reducedMotion ? `scene-enter-${direction > 0 ? 'forward' : 'back'} .75s var(--ease-main) both` : 'none',
        transform: active ? 'translateX(0) scale(1)' : `translateX(${reducedMotion ? 0 : (meta.id === prevScene ? -direction : direction) * 52}px) scale(${reducedMotion ? 1 : 1.018})`,
        transition:
          'opacity 0.75s var(--ease-main), transform 0.9s var(--ease-main)',
        zIndex: active ? 10 : 1,
        visibility: active ? 'visible' : 'hidden',
        transitionProperty: 'opacity, transform, visibility',
        transitionDelay: active ? '0s' : '0s, 0s, 0.75s',
      }}
    >
      {children}
      <SourceChip ids={meta.sourceIds} />
    </section>
  )
}
