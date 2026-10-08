export type LinkItem = {
  label: string
  href: string
}

export type Project = {
  /** Stable slug used to wire up the tab/panel ARIA ids. */
  id: string
  title: string
  stack: string
  /** Cover image on the deck card. Served from `public/`, so the path starts at `/`. */
  image: string
  links: LinkItem[]
  points: string[]
}

export type SkillGroup = {
  label: string
  items: string
}

export type Job = {
  title: string
  company: string
  period: string
  points: string[]
}

export type Contribution = {
  date: string
  count: number
  level: number
}

/** A week column is padded with `null` cells before the first day and after the last. */
export type Week = (Contribution | null)[]
