import type { SceneMeta } from '../content/scenes'

export interface SceneProps {
  active: boolean
  meta: SceneMeta
}

/** `.g-reveal` 의미 단위 stagger reveal — 모든 Scene 공통 intro */
export function revealCopy(tl: gsap.core.Timeline, at: gsap.Position = 0.2) {
  tl.from('.g-reveal', { y: 26, opacity: 0, stagger: 0.16, duration: 0.7 }, at)
}
