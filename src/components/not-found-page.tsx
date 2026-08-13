import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function NotFoundPage() {
  return (
    <main
      aria-labelledby="not-found-title"
      className="mx-auto grid min-h-[calc(100dvh-var(--layout-header-height))] w-full max-w-400 grid-cols-1 content-center px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:px-12 lg:py-24 xl:px-16 xl:py-28"
    >
      <section className="w-full md:mx-auto md:max-w-2xl lg:col-span-8 lg:col-start-3 lg:mx-0 lg:max-w-none xl:col-span-7 xl:col-start-4">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-ctea-gold sm:w-12 md:w-20" aria-hidden="true" />
          <p className="font-sport text-kicker uppercase text-ctea-gold-statement">
            Page not found
          </p>
        </div>

        <p
          aria-hidden="true"
          className="mt-7 font-sport text-[clamp(6rem,26vw,10rem)] font-bold leading-[0.78] tracking-[-0.035em] text-ctea-navy sm:mt-8 md:text-[clamp(8rem,18vw,12rem)] dark:text-ctea-gold-ornament"
        >
          404
        </p>

        <div className="mt-8 max-w-2xl border-t border-ctea-gold/65 pt-7 sm:mt-10 sm:pt-8 md:mt-12 md:pt-10 lg:mt-14">
          <h1 id="not-found-title" className="font-display text-section text-ctea-ink">
            找不到這個頁面
          </h1>
          <p className="mt-5 max-w-xl font-body text-lead text-ctea-ink-muted">
            您開啟的網址可能已變更或不存在。請返回首頁，繼續瀏覽協會資訊。
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex min-h-13 items-center gap-4 border border-ctea-gold bg-ctea-navy px-6 font-body text-action text-ctea-hero-ink transition-colors duration-200 hover:bg-ctea-gold hover:text-ctea-hero-ground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ctea-gold-focus md:px-8"
          >
            返回首頁
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  )
}
