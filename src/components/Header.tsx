import { useEffect, useState } from 'react'
import { BRAND, NAV } from '../data/site'
import { cx } from '../lib/cx'

const BAR =
  'block h-[1.5px] w-full rounded-[1px] bg-ink transition-[transform,opacity] ease-out'

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Once the nav is a real horizontal row again, drop the collapsed state.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 640px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    wide.addEventListener('change', onChange)
    return () => wide.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="relative z-[1] mx-auto flex max-w-page items-center justify-between px-6 pt-8 max-nav:z-[2] max-narrow:pt-6">
      <a className="text-lg font-bold tracking-[-0.02em]" href="#top">
        {BRAND}
        <span className="text-muted">.</span>
      </a>

      <button
        type="button"
        className="group hidden shrink-0 cursor-pointer flex-col justify-center gap-[5px] rounded-[10px] border border-hairline px-2.5 py-0 w-[42px] h-[42px] transition-colors hover:border-[#3a3a3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a4a4a] max-nav:flex"
        aria-expanded={open}
        aria-controls="nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={cx(BAR, 'duration-200 group-aria-expanded:translate-y-[6.5px] group-aria-expanded:rotate-45')} />
        <span className={cx(BAR, 'duration-150 group-aria-expanded:opacity-0')} />
        <span className={cx(BAR, 'duration-200 group-aria-expanded:-translate-y-[6.5px] group-aria-expanded:-rotate-45')} />
      </button>

      <nav
        id="nav"
        className={cx(
          'flex flex-wrap items-center justify-end gap-6',
          'max-nav:absolute max-nav:inset-x-6 max-nav:top-[calc(100%+10px)] max-nav:flex-col max-nav:flex-nowrap max-nav:items-stretch max-nav:justify-start max-nav:gap-0 max-nav:rounded-xl max-nav:border max-nav:border-hairline max-nav:bg-surface max-nav:p-2 max-nav:shadow-[0_16px_32px_rgba(0,0,0,0.5)]',
          open ? 'max-nav:flex' : 'max-nav:hidden'
        )}
      >
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="text-sm text-muted transition-colors hover:text-ink max-nav:rounded-lg max-nav:px-2.5 max-nav:py-3 max-nav:text-[15px] max-nav:hover:bg-[#1a1a1a]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
