import { BulletList } from './BulletList'
import { Section } from './Section'
import { JOBS } from '../data/work'

export function Work() {
  return (
    <Section id="work" title="Work Experience">
      <div className="flex flex-col gap-3">
        {JOBS.map((job) => (
          <div key={`${job.title}@${job.period}`} className="flex flex-col gap-3">
            <div>
              <h3 className="mb-1.5 text-xl font-semibold">{job.title}</h3>
              <span className="block text-sm text-muted">{job.company}</span>
              <span className="mt-1 block font-mono text-[13px] text-muted">
                {job.period}
              </span>
            </div>
            <BulletList items={job.points} />
          </div>
        ))}
      </div>
    </Section>
  )
}
