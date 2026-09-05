import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePresentation } from '../lib/usePresentation'

/**
 * 풀블리드/스플릿 미디어 프레임.
 * - video 있으면 muted/autoplay/playsInline + poster
 * - 재생 실패 또는 파일 없음 → hero 이미지 fallback
 * - hero도 없으면 그라디언트 배경만 (발표 진행에 지장 없음)
 * - Scene 비활성 시 video pause (메모리/CPU 절약)
 */
export function MediaFrame({
  video,
  poster,
  active,
  overlay = true,
  className = '',
  style,
  dim = 0,
}: {
  video?: string
  poster?: string
  active: boolean
  overlay?: boolean
  className?: string
  style?: CSSProperties
  dim?: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const { restartVideoTick } = usePresentation()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.currentTime = 0
      v.play().catch(() => setVideoFailed(true))
    } else {
      v.pause()
    }
  }, [active, restartVideoTick])

  const showVideo = video && !videoFailed
  const showPoster = poster && !posterFailed

  return (
    <div className={`mframe ${className}`} style={style}>
      {showVideo ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload={active ? 'auto' : 'metadata'}
          onError={() => setVideoFailed(true)}
        />
      ) : showPoster ? (
        <img src={poster} alt="" onError={() => setPosterFailed(true)} />
      ) : null}
      {overlay && <div className="m-overlay" />}
      {dim > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: `rgba(5,14,24,${dim})` }} />
      )}
    </div>
  )
}
