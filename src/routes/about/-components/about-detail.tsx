import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { FileRouteTypes } from '#/routeTree.gen'

type AboutPageShellProps = {
  eyebrow: string
  title: string
  kicker: string
  summary: string
  stats?: ReadonlyArray<{
    value: string
    label: string
  }>
  children: ReactNode
}

type AboutSectionProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

type AboutNextLinkProps = {
  label: string
  to: FileRouteTypes['to']
}

export function AboutPageShell({
  eyebrow,
  title,
  kicker,
  summary,
  stats = [],
  children,
}: AboutPageShellProps) {
  return (
    <article className="relative overflow-hidden pb-8">
      <header className="border-b border-[rgba(17,17,15,0.18)] pb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b7254]">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-[#11110f]">
          {title}
        </h1>
        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <p className="text-2xl font-medium leading-[1.08] tracking-[-0.05em] text-[#11110f] sm:text-4xl">
            {kicker}
          </p>
          <p className="max-w-2xl text-base leading-8 text-[#43423e]">{summary}</p>
        </div>
        {stats.length > 0 ? (
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-[rgba(17,17,15,0.18)] pt-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b7254]">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-medium tracking-[-0.055em] text-[#11110f]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <div className="grid gap-12 pt-12">{children}</div>
    </article>
  )
}

type AboutTitleProps = {
  eyebrow: string
  title: string
} & React.ComponentProps<'header'>
export function AboutTitle({ eyebrow, title, ...props }: AboutTitleProps) {
  return (
    <header {...props}>
      <p className="font-sport text-kicker uppercase text-ctea-brown">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl font-display text-section text-foreground">
        {title}
      </h2>
    </header>
  )
}

export function AboutSection({ eyebrow, title, children }: AboutSectionProps) {
  return (
    <section className="grid gap-8  pb-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b7254]">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.7rem)] font-medium leading-[0.96] tracking-[-0.06em] text-[#11110f]">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export function AboutNextLink({ label, to }: AboutNextLinkProps) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-11 items-center gap-4 justify-self-start border-b border-ctea-gold font-body text-action text-foreground transition-colors duration-200 hover:text-ctea-gold-statement focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus"
    >
      {label}
      <span
        className="grid size-7 place-items-center rounded-full border border-ctea-gold transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  )
}
