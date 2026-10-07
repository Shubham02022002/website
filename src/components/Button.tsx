import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

/* Variants are separate branches rather than stacked classes so the primary
   hover colours never compete with the default hover border. */
const BASE =
  'inline-flex items-center rounded-lg border px-[18px] py-2.5 text-sm font-medium transition duration-150 hover:-translate-y-px'

const VARIANT = {
  default: 'border-hairline hover:border-[#3a3a3a]',
  primary:
    'border-ink bg-ink text-[#0a0a0a] hover:border-[#d9d9d9] hover:bg-[#d9d9d9]',
} as const

type Props = {
  href: string
  children: ReactNode
  variant?: keyof typeof VARIANT
}

export function Button({ href, children, variant = 'default' }: Props) {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      className={cx(BASE, VARIANT[variant])}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
