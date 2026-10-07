import { useEffect, useState } from 'react'
import { Section } from './Section'
import { GITHUB_USER, LINKS } from '../data/site'
import { dayTitle, fetchContributions, monthLabels } from '../lib/github'
import type { Week } from '../types'
import { cx } from '../lib/cx'

const LEVEL_BG: Record<number, string> = {
  0: 'bg-[#171717]',
  1: 'bg-[#2e2e2e]',
  2: 'bg-[#4f4f4f]',
  3: 'bg-[#8c8c8c]',
  4: 'bg-[#f2f2f2]',
}

const LEVELS = [0, 1, 2, 3, 4]

function levelBg(level: number): string {
  return LEVEL_BG[level] ?? LEVEL_BG[0]
}

type State =
  | { status: 'loading' }
  | { status: 'ready'; weeks: Week[]; total: number }
  | { status: 'error' }

function Graph({ weeks }: { weeks: Week[] }) {
  const labels = monthLabels(weeks)

  return (
    <>
      <div className="mb-1.5 grid grid-flow-col auto-cols-[9px] gap-[3px] font-mono text-[11px] text-muted max-narrow:auto-cols-[8px] max-narrow:gap-[2px]">
        {labels.map((label, index) => (
          <span key={index} className="whitespace-nowrap">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-flow-col auto-cols-[9px] grid-rows-[repeat(7,9px)] gap-[3px] max-narrow:auto-cols-[8px] max-narrow:grid-rows-[repeat(7,8px)] max-narrow:gap-[2px]">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <span
              key={`${weekIndex}-${dayIndex}`}
              title={day ? dayTitle(day) : undefined}
              className={cx(
                'size-[9px] rounded-[2px] max-narrow:size-[8px]',
                levelBg(day?.level ?? 0)
              )}
            />
          ))
        )}
      </div>
    </>
  )
}

export function Activity() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchContributions(GITHUB_USER, controller.signal)
      .then(({ weeks, total }) => setState({ status: 'ready', weeks, total }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ status: 'error' })
      })

    return () => controller.abort()
  }, [])

  return (
    <Section id="activity" title="GitHub Activity">
      <p className="mb-8 max-w-[560px] text-[17px] leading-[1.6] text-muted">
        {state.status === 'ready'
          ? `${state.total} contribution${state.total === 1 ? '' : 's'} in the last year.`
          : state.status === 'loading'
            ? 'Loading contributions…'
            : 'GitHub activity'}
      </p>

      <div className="overflow-x-auto pb-1">
        {state.status === 'ready' && <Graph weeks={state.weeks} />}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-[13px] text-muted">
        <span>
          {state.status === 'error' ? (
            <>
              Couldn&apos;t load contributions right now —{' '}
              <a
                className="text-ink"
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                view the profile on GitHub ↗
              </a>
            </>
          ) : (
            'Contributions over the last year. Hover a day for details.'
          )}
        </span>

        <span className="flex items-center gap-[5px] font-mono text-[11px]">
          <span>Less</span>
          {LEVELS.map((level) => (
            <span
              key={level}
              className={cx('size-2.5 rounded-[2px]', levelBg(level))}
            />
          ))}
          <span>More</span>
        </span>
      </div>
    </Section>
  )
}
