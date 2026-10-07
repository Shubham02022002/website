export const NAME = 'Shubham Chaudhary'

/** First name only — the header wordmark renders this followed by a period. */
export const BRAND = 'Shubham'

export const GITHUB_USER = 'Shubham02022002'

/** Every outbound URL lives here so a link is only ever written once. */
export const LINKS = {
  github: `https://github.com/${GITHUB_USER}`,
  linkedin: 'https://www.linkedin.com/in/shubham-chaudhary-5123aa433/',
  x: 'https://x.com/shellShubh',
  email: 'chaudhary2001shubham@gmail.com',
  phone: '+919027881144',
  phoneDisplay: '+91 9027881144',
} as const

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activity', href: '#activity' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const

export const HERO = {
  eyebrow: 'Prev. System Engineer @ TCS',
  lede: 'Full Stack Developer & Cloud Infrastructure enthusiast, passionate about automation and building things that scale. Currently exploring AI. 24, based in India.',
} as const

export const SOCIALS = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'X', href: LINKS.x },
] as const
