import { useState } from 'react'
import { SCENES } from '../content/scenes'
import { usePresentation } from '../lib/usePresentation'

/** 좌하단 80×80 보이지 않는 hotspot → emergency jump 메뉴 */
export function PresenterMenu() {
  const [open, setOpen] = useState(false)
  const { scene, goTo } = usePresentation()

  return (
    <>
      <div className="pmenu-hotspot" onClick={() => setOpen((o) => !o)} />
      {open && (
        <div className="pmenu">
          {SCENES.map((s) => (
            <button
              key={s.id}
              className={s.id === scene ? 'cur' : ''}
              title={s.shortTitle}
              onClick={() => {
                goTo(s.id)
                setOpen(false)
              }}
            >
              {String(s.id).padStart(2, '0')}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
