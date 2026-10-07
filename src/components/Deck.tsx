import { useRef, type CSSProperties, type KeyboardEvent } from 'react'
import type { Project } from '../types'
import { cx } from '../lib/cx'

type Props = {
  projects: readonly Project[]
  active: number
  onSelect: (index: number) => void
}

export function Deck({ projects, active, onSelect }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = projects.length - 1
    let next: number

    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % projects.length
        break
      case 'ArrowLeft':
        next = (index + last) % projects.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }

    event.preventDefault()
    onSelect(next)
    // Every card is mounted, so the target tab is already focusable.
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      className="deck"
      role="tablist"
      aria-label="Projects"
      // The fan is symmetric around the middle card.
      style={{ '--mid': (projects.length - 1) / 2 } as CSSProperties}
    >
      {projects.map((project, index) => {
        const selected = index === active

        return (
          <button
            key={project.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`tab-${project.id}`}
            aria-controls={`panel-${project.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            style={{ '--i': index } as CSSProperties}
            className={cx(
              'deck-card flex cursor-pointer flex-col items-start rounded-xl border px-4 py-3.5 text-left text-ink',
              'bg-[linear-gradient(160deg,#1b1b1b,#101010)]',
              'hover:border-[#4a4a4a] focus-visible:border-[#4a4a4a] focus-visible:outline-none',
              selected
                ? 'border-[#5a5a5a] bg-[linear-gradient(160deg,#242424,#141414)]'
                : 'border-hairline'
            )}
          >
            <span className="font-mono text-[11px] text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-auto text-base font-semibold tracking-[-0.01em]">
              {project.title}
            </span>
            <span className="mt-1 font-mono text-[10px] text-muted">
              {project.stack}
            </span>
          </button>
        )
      })}
    </div>
  )
}
