import { BulletList } from './BulletList'
import type { Project } from '../types'
import { cx } from '../lib/cx'

type Props = {
  project: Project
  active: boolean
}

export function ProjectPanel({ project, active }: Props) {
  return (
    <article
      id={`panel-${project.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${project.id}`}
      tabIndex={0}
      className={cx(
        'flex-col gap-3 rounded-xl border border-hairline bg-surface p-5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a4a4a]',
        // Inactive panels stay in the DOM so the copy is crawlable; display:none
        // keeps them out of the accessibility tree.
        active ? 'flex animate-panel-in motion-reduce:animate-none' : 'hidden'
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 max-narrow:flex-col max-narrow:items-start">
        <h3 className="text-[17px] font-semibold">{project.title}</h3>
        {project.links.length > 0 && (
          <span className="flex flex-wrap items-baseline gap-3.5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </span>
        )}
      </div>
      <BulletList items={project.points} />
    </article>
  )
}
