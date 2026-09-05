import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { usePresentation } from './usePresentation'

/**
 * Scene 진입 시 GSAP intro 타임라인을 생성/재생하고 이탈 시 정리한다.
 * active가 true가 되는 순간 build(tl, root)가 호출된다.
 * prefers-reduced-motion이면 타임라인을 즉시 끝 상태로 보낸다.
 */
export function useSceneTimeline(
  active: boolean,
  build: (tl: gsap.core.Timeline, root: HTMLDivElement) => void,
): RefObject<HTMLDivElement> {
  const rootRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = usePresentation()
  const buildRef = useRef(build)
  buildRef.current = build

  useLayoutEffect(() => {
    if (!active || !rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.65 } })
      buildRef.current(tl, rootRef.current!)
      if (reducedMotion) tl.progress(1)
    }, rootRef)
    return () => ctx.revert()
  }, [active, reducedMotion])

  return rootRef
}

/** 숫자 count-up 타깃 요소를 tl에 등록하는 헬퍼 (0.8~1.2초, 종료 시 4% pulse) */
export function countUp(
  tl: gsap.core.Timeline,
  el: Element | string,
  to: number,
  opts: { duration?: number; suffix?: string; decimals?: number; pulse?: boolean; at?: gsap.Position } = {},
) {
  const { duration = 1.0, suffix = '', decimals = 0, pulse = true, at } = opts
  const obj = { v: 0 }
  tl.to(
    obj,
    {
      v: to,
      duration,
      ease: 'power2.out',
      onUpdate() {
        const nodes = typeof el === 'string' ? gsap.utils.toArray<Element>(el) : [el]
        const text = obj.v.toFixed(decimals) + suffix
        nodes.forEach((n) => ((n as HTMLElement).textContent = text))
      },
    },
    at,
  )
  if (pulse) {
    tl.to(el, { scale: 1.04, duration: 0.12, ease: 'power1.out' }).to(el, {
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    })
  }
}

/** SVG path line-tracing 준비: dasharray/offset 세팅 후 tl에 tracing 추가 */
export function traceLine(
  tl: gsap.core.Timeline,
  el: SVGPathElement | SVGLineElement | SVGPolylineElement | string,
  opts: { duration?: number; at?: gsap.Position; stagger?: number } = {},
) {
  const { duration = 0.9, at, stagger = 0 } = opts
  const nodes = typeof el === 'string' ? gsap.utils.toArray<SVGGeometryElement>(el) : [el as SVGGeometryElement]
  nodes.forEach((n) => {
    const len = typeof n.getTotalLength === 'function' ? n.getTotalLength() : 300
    n.style.strokeDasharray = `${len}`
    n.style.strokeDashoffset = `${len}`
  })
  tl.to(nodes, { strokeDashoffset: 0, duration, ease: 'power2.inOut', stagger }, at)
}
