import { useEffect } from 'react'
import { StageScaler } from './components/StageScaler'
import { ProgressBar } from './components/ProgressBar'
import { PresenterHUD } from './components/PresenterHUD'
import { PresenterMenu } from './components/PresenterMenu'
import { SceneShell } from './components/SceneShell'
import { SCENES } from './content/scenes'
import { SCENE_COMPONENTS } from './scenes'
import { usePresentation } from './lib/usePresentation'

export default function App() {
  const { scene, next, prev, goTo, togglePresenter, restartVideo } = usePresentation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Esc: fullscreen 해제만 브라우저 기본동작에 맡김
      switch (e.key) {
        case ' ':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'p':
        case 'P':
          togglePresenter()
          break
        case 'f':
        case 'F':
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen()
          break
        case 'v':
        case 'V':
          restartVideo()
          break
        case 'm':
        case 'M':
          // 모든 영상은 항상 muted (안전장치) — no-op 확인용
          break
        default: {
          // 1~9 직접 이동, Shift+1~8 → Scene 10~17
          if (/^[1-9]$/.test(e.key) && !e.shiftKey) goTo(parseInt(e.key, 10))
          else if (e.shiftKey && /^Digit[1-8]$/.test(e.code))
            goTo(9 + parseInt(e.code.slice(5), 10))
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, togglePresenter, restartVideo])

  return (
    <StageScaler>
      {SCENES.map((meta, i) => {
        const n = meta.id
        // 현재±1 Scene만 렌더링 (메모리·성능)
        if (Math.abs(n - scene) > 1) return null
        const Comp = SCENE_COMPONENTS[i]
        const active = n === scene
        return (
          <SceneShell key={n} meta={meta} active={active}>
            <Comp active={active} meta={meta} />
          </SceneShell>
        )
      })}
      <ProgressBar />
      <PresenterHUD />
      <PresenterMenu />
    </StageScaler>
  )
}
