import { Button } from './Button'
import { HERO, NAME, SOCIALS } from '../data/site'

export function Hero() {
  return (
    <section id="top" className="pt-24 pb-18 max-narrow:pt-18 max-narrow:pb-14">
      <img
        className="mb-6 size-16 rounded-full border border-hairline object-cover"
        src="/img.png"
        alt={NAME}
        width={64}
        height={64}
      />
      <p className="mb-4 font-mono text-[13px] tracking-[0.04em] text-muted uppercase">
        {HERO.eyebrow}
      </p>
      <h1 className="mb-5 text-[44px] leading-[1.15] font-bold tracking-[-0.02em] max-narrow:text-[32px]">
        Hi, I&apos;m {NAME}.
      </h1>
      <p className="mb-8 max-w-[560px] text-[17px] leading-[1.6] text-muted">
        {HERO.lede}
      </p>
      <div className="flex flex-wrap gap-3">
        {SOCIALS.map((social, index) => (
          <Button
            key={social.href}
            href={social.href}
            variant={index === 0 ? 'primary' : 'default'}
          >
            {social.label}
          </Button>
        ))}
      </div>
    </section>
  )
}
