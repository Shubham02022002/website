type Props = {
  items: readonly string[]
}

/** The dotted list shared by work history, project details and achievements. */
export function BulletList({ items }: Props) {
  return (
    <ul className="mt-2 flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-[18px] text-[15px] leading-[1.6] text-muted before:absolute before:top-[9px] before:left-0 before:size-1.5 before:rounded-full before:bg-muted before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
