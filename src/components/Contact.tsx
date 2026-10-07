import { Button } from './Button'
import { Section } from './Section'
import { LINKS } from '../data/site'

export function Contact() {
  return (
    <Section id="contact" title="Let's connect">
      <p className="mb-8 max-w-[560px] text-[17px] leading-[1.6] text-muted">
        Open to interesting conversations and opportunities.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button href={LINKS.linkedin} variant="primary">
          Connect on LinkedIn
        </Button>
        <Button href={LINKS.github}>See my GitHub</Button>
      </div>

      <ul className="mt-6 flex flex-col gap-2 font-mono text-sm">
        <li>
          <a
            className="text-muted transition-colors hover:text-ink"
            href={`mailto:${LINKS.email}`}
          >
            {LINKS.email}
          </a>
        </li>
        <li>
          <a
            className="text-muted transition-colors hover:text-ink"
            href={`tel:${LINKS.phone}`}
          >
            {LINKS.phoneDisplay}
          </a>
        </li>
      </ul>
    </Section>
  )
}
