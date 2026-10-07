import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type Props = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className }: Props) {
  return (
    <section id={id} className={cx('border-t border-hairline py-14', className)}>
      <h2 className="mb-8 font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}
