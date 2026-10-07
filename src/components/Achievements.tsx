import { BulletList } from './BulletList'
import { Section } from './Section'
import { ACHIEVEMENTS } from '../data/achievements'

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Positions of Responsibility">
      <BulletList items={ACHIEVEMENTS} />
    </Section>
  )
}
