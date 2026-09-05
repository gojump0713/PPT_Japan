import { SOURCES } from '../content/sources'
import { usePresentation } from '../lib/usePresentation'

/** 우하단 출처 chip. hover 시 상세, presenter mode에서 URL 노출. */
export function SourceChip({ ids }: { ids: string[] }) {
  const { presenter } = usePresentation()
  if (ids.length === 0) return null
  const sources = ids.map((id) => SOURCES[id]).filter(Boolean)
  const label = sources
    .map((s) => `${s.organization} ${s.date}`)
    .join(' · ')

  return (
    <div className="schip">
      Source: {label}
      <div className="schip-detail">
        {sources.map((s) => (
          <div key={s.id} style={{ marginBottom: 8 }}>
            <strong>{s.organization}</strong> — {s.title} ({s.date})
            {presenter && s.url && <span className="u">{s.url}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
