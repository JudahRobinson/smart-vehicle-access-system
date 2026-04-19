import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle: string
  right?: ReactNode
}

export function PageHeader({ title, subtitle, right }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-sky-300/80">{subtitle}</p>
      </div>
      {right}
    </div>
  )
}
