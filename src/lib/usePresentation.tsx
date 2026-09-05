import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { TOTAL_SCENES } from '../content/scenes'

interface PresentationState {
  scene: number // 1-based
  prevScene: number
  presenter: boolean
  muted: boolean
  startedAt: number | null
  reducedMotion: boolean
  goTo: (n: number) => void
  next: () => void
  prev: () => void
  togglePresenter: () => void
  toggleMute: () => void
  restartVideoTick: number
  restartVideo: () => void
}

const Ctx = createContext<PresentationState | null>(null)

function sceneFromHash(): number {
  const m = window.location.hash.match(/scene-(\d{1,2})/)
  if (!m) return 1
  const n = parseInt(m[1], 10)
  return n >= 1 && n <= TOTAL_SCENES ? n : 1
}

const DEBOUNCE_MS = 650

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState(sceneFromHash)
  const [prevScene, setPrevScene] = useState(scene)
  const [presenter, setPresenter] = useState(false)
  const [muted, setMuted] = useState(true)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [restartVideoTick, setRestartVideoTick] = useState(0)
  const lastNav = useRef(0)

  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const goTo = useCallback(
    (n: number, force = false) => {
      const now = performance.now()
      if (!force && now - lastNav.current < DEBOUNCE_MS) return
      lastNav.current = now
      const clamped = Math.max(1, Math.min(TOTAL_SCENES, n))
      setScene((cur) => {
        if (clamped === cur) return cur
        setPrevScene(cur)
        return clamped
      })
      setStartedAt((s) => s ?? Date.now())
    },
    [],
  )

  const next = useCallback(() => goTo(sceneRef.current + 1), [goTo])
  const prev = useCallback(() => goTo(sceneRef.current - 1), [goTo])

  const sceneRef = useRef(scene)
  sceneRef.current = scene

  // hash 동기화 (양방향)
  useEffect(() => {
    const target = `#scene-${String(scene).padStart(2, '0')}`
    if (window.location.hash !== target) history.replaceState(null, '', target)
  }, [scene])

  useEffect(() => {
    const onHash = () => {
      const n = sceneFromHash()
      if (n !== sceneRef.current) goTo(n, true)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [goTo])

  const value = useMemo<PresentationState>(
    () => ({
      scene,
      prevScene,
      presenter,
      muted,
      startedAt,
      reducedMotion,
      goTo: (n) => goTo(n, true),
      next,
      prev,
      togglePresenter: () => setPresenter((p) => !p),
      toggleMute: () => setMuted(true), // M: mute 고정 (해제 없음 — 발표 안전장치)
      restartVideoTick,
      restartVideo: () => setRestartVideoTick((t) => t + 1),
    }),
    [scene, prevScene, presenter, muted, startedAt, reducedMotion, goTo, next, prev, restartVideoTick],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePresentation(): PresentationState {
  const v = useContext(Ctx)
  if (!v) throw new Error('usePresentation must be used within PresentationProvider')
  return v
}
