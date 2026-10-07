import type { Contribution, Week } from '../types'

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const API = 'https://github-contributions-api.jogruber.de/v4'

type ApiResponse = {
  contributions: Contribution[]
  total: { lastYear: number }
}

function isApiResponse(value: unknown): value is ApiResponse {
  if (typeof value !== 'object' || value === null) return false
  const { contributions, total } = value as Partial<ApiResponse>
  return Array.isArray(contributions) && typeof total?.lastYear === 'number'
}

/** `date` is a plain `YYYY-MM-DD`; parse it as UTC so it can't shift a day. */
function utcDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`)
}

export async function fetchContributions(
  user: string,
  signal: AbortSignal
): Promise<{ weeks: Week[]; total: number }> {
  const response = await fetch(`${API}/${user}?y=last`, { signal })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)

  const data: unknown = await response.json()
  if (!isApiResponse(data)) throw new Error('Unexpected response shape')

  return { weeks: chunkIntoWeeks(data.contributions), total: data.total.lastYear }
}

/** Pads the first and last weeks so every column has exactly seven rows. */
function chunkIntoWeeks(days: Contribution[]): Week[] {
  const first = days[0]
  if (!first) return []

  const leading = utcDate(first.date).getUTCDay()
  const cells: Week = [
    ...Array.from({ length: leading }, () => null),
    ...days,
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: Week[] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function monthIndexOfWeek(week: Week, fallback: number): number {
  const firstDay = week.find(Boolean)
  return firstDay ? utcDate(firstDay.date).getUTCMonth() : fallback
}

/** One label per week, blanked out until the month actually changes. */
export function monthLabels(weeks: Week[]): string[] {
  let previous: number | null = null

  return weeks.map((week) => {
    const month = monthIndexOfWeek(week, previous ?? 0)
    const label = month === previous ? '' : MONTHS[month]
    previous = month
    return label
  })
}

export function dayTitle(day: Contribution): string {
  const [year, month, date] = day.date.split('-')
  const pretty = `${MONTHS[Number(month) - 1]} ${Number(date)}, ${year}`
  const plural = day.count === 1 ? '' : 's'
  return `${day.count} contribution${plural} on ${pretty}`
}
