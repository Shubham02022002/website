import { NAME } from '../data/site'

export function Footer() {
  return (
    <footer className="relative z-[1] mx-auto max-w-page border-t border-hairline px-6 pt-8 pb-12 text-[13px] text-muted">
      <span>© {new Date().getFullYear()} {NAME}</span>
    </footer>
  )
}
