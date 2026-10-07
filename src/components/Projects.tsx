import { useState } from 'react'
import { Deck } from './Deck'
import { ProjectPanel } from './ProjectPanel'
import { Section } from './Section'
import { PROJECTS } from '../data/projects'

export function Projects() {
  const [active, setActive] = useState(0)

  return (
    <Section id="projects" title="Projects">
      <Deck projects={PROJECTS} active={active} onSelect={setActive} />

      <p className="mt-5 mb-8 text-center font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
        Select a card to read the details.
      </p>

      <div className="flex flex-col gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            active={index === active}
          />
        ))}
      </div>
    </Section>
  )
}
