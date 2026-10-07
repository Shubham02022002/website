import { Section } from './Section'
import { SKILLS } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="flex flex-col gap-3.5">
        {SKILLS.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-1 mid:flex-row mid:gap-6"
          >
            <span className="font-mono text-[13px] font-semibold mid:w-40 mid:shrink-0">
              {group.label}
            </span>
            <span className="text-sm leading-[1.6] text-muted">
              {group.items}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
