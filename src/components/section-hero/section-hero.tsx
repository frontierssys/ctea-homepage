import type { ReactNode } from 'react'
import type { HomepageHero } from '#/lib/content/homepage'
import { HeroGateImage } from './hero-gate-image'
import { SKETCH_CURVE_PATH, SKETCH_LEFT_CLIP_OB, SKETCH_RIGHT_BG_CLIP_OB } from './curve-clip'
import './style.css'

export type SectionHeroProps = {
  hero: HomepageHero
  footer?: ReactNode
}

export function SectionHero({ hero, footer }: SectionHeroProps) {
  return (
    <section
      id="home"
      className="ctea-sketch-hero bg-[#f8f2e8] text-[#151310] transition-colors duration-200 dark:bg-[#122231] dark:text-[#f1eade] motion-reduce:transition-none"
      aria-labelledby="ctea-sketch-title"
    >
      <div className="relative overflow-hidden min-h-dvh max-md:flex max-md:min-h-0 max-md:flex-col ">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[#fbf6ed] transition-colors duration-200 dark:bg-[#0b1825] motion-reduce:transition-none"
          aria-hidden="true"
        />

        <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
          <defs>
            <clipPath id="ctea-sketch-bg-right" clipPathUnits="objectBoundingBox">
              <path d={SKETCH_RIGHT_BG_CLIP_OB} />
            </clipPath>
            <clipPath id="ctea-sketch-rider-left" clipPathUnits="objectBoundingBox">
              <path d={SKETCH_LEFT_CLIP_OB} />
            </clipPath>
          </defs>
        </svg>

        <div className="ctea-sketch-bg-desktop pointer-events-none absolute inset-0 max-md:hidden">
          <div className="absolute left-[40%] inset-y-0 right-0">
            <ThemeAwareHeroBackground hero={hero} />
          </div>
        </div>

        <div className="ctea-sketch-rider-desktop absolute inset-0 z-10 max-md:hidden group">
          <div className="absolute inset-y-0 left-0 w-[42.3%]">
            <HeroGateImage
              imageKind="rider"
              src={hero.rider}
              alt="馬場馬術騎手騎乘黑馬"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[30%_center] group-hover:scale-[1.007] transition-transform ease-out duration-700"
            />
            <div
              className="
                    absolute inset-0 
                    bg-[linear-gradient(90deg,transparent_0%,rgba(251,246,237,0)_42%,rgba(251,246,237,0.14)_68%,rgba(251,246,237,0.42)_86%,rgba(247,239,226,0.68)_100%)] 
                    dark:bg-[linear-gradient(90deg,transparent_0%,rgba(11,24,37,0)_42%,rgba(11,24,37,.12)_68%,rgba(11,24,37,.52)_86%,rgba(11,24,37,.9)_100%)]
                  "
              aria-hidden="true"
            />
          </div>
        </div>

        <HeroGateImage
          imageKind="bg"
          src={hero.bg}
          alt="sketch ivory background"
          aria-hidden="true"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-95 transition-opacity duration-200 dark:opacity-10 dark:mix-blend-screen motion-reduce:transition-none md:hidden"
        />

        <div className="relative order-1 h-[43vh] min-h-[300px] w-full overflow-hidden md:hidden">
          <HeroGateImage
            imageKind="rider"
            src={hero.rider}
            alt="馬場馬術騎手騎乘黑馬"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[5%_center]"
          />
          <div
            className="
                absolute inset-0 
                bg-[linear-gradient(180deg,rgba(250,246,238,.02),rgba(247,239,226,.08))] 
                dark:bg-[linear-gradient(180deg,transparent_55%,rgba(11,24,37,.9))]
              "
            aria-hidden="true"
          />
        </div>

        <svg
          className="ctea-sketch-divider pointer-events-none absolute inset-y-0 left-[37.7%] z-20 h-full w-[5.8%] overflow-visible text-[#b88d42]/72 dark:text-[#c6a465] max-md:hidden"
          viewBox="0 0 100 820"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d={SKETCH_CURVE_PATH} stroke="currentColor" strokeWidth="1.15" pathLength="1" />
          <path
            d="M61-8C27 94 29 195 59 315c12 48 14 69 3 95-20 49-20 107 0 174 25 91 25 165-3 244"
            stroke="currentColor"
            strokeWidth=".55"
            pathLength="1"
          />
          <path
            d="m57 399 8 11-8 11-8-11 8-11Z"
            className="fill-[#fbf6ed] dark:fill-[#0B1825]"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div
          className="
            relative z-30 ml-[42.3%] flex items-center justify-center px-10 pt-8 pb-14 text-center max-md:order-2 max-md:ml-0  max-md:px-5 max-md:py-14
            translate-y-0 lg:translate-y-30
            min-h-dvh max-md:min-h-[560px] max-sm:min-h-[520px]
          "
        >
          <div className="w-full max-w-[860px]  max-xl:max-w-[740px] max-md:max-w-[680px] max-md:translate-y-0">
            <div className="ctea-sketch-ornament relative -top-9 mb-1 flex items-center justify-center gap-5 max-sm:top-0 max-sm:mb-3">
              <span className="h-px w-24 bg-[rgba(182,140,67,.65)] dark:bg-[rgba(198,164,101,.62)] max-sm:w-14" />
              <img src={hero.logo} alt="CTEA" className="h-18 w-auto" />
              <span className="h-px w-24 bg-[rgba(182,140,67,.65)] dark:bg-[rgba(198,164,101,.62)] max-sm:w-14" />
            </div>

            <h1
              id="ctea-sketch-title"
              className="ctea-sketch-title font-[Georgia,'Times_New_Roman',serif] text-[clamp(39px,3.35vw,56px)] leading-[1.16] font-normal tracking-[0.005em] uppercase max-sm:text-[clamp(25px,7.2vw,27px)]"
            >
              <span className="block">{hero.titleLine1}</span>
              <span className="block">{hero.titleLine2}</span>
            </h1>

            <div
              className="ctea-sketch-rule my-6 flex items-center gap-4 max-sm:my-5"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-[rgba(182,140,67,.65)] dark:bg-[rgba(198,164,101,.62)]" />
              <span className="size-2 rotate-45 bg-[#b68c43] dark:bg-[#c6a465]" />
              <span className="h-px flex-1 bg-[rgba(182,140,67,.65)] dark:bg-[rgba(198,164,101,.62)]" />
            </div>

            <p className="ctea-sketch-statement font-['Noto_Serif_TC','Songti_TC',serif] text-[clamp(38px,3.45vw,56px)] leading-[1.2] font-medium tracking-[0.11em] whitespace-nowrap max-md:whitespace-normal max-sm:text-[clamp(27px,8vw,30px)] max-sm:tracking-[0.06em]">
              <span className="text-[#a77d35] dark:text-[#c6a465]">{hero.sloganAccent}</span>
              <span>{hero.sloganRest}</span>
            </p>
            <p className="ctea-sketch-subcopy mt-5 font-['Noto_Serif_TC','Songti_TC',serif] text-[clamp(17px,1.4vw,23px)] tracking-[0.14em] text-[#62615e] dark:text-[#b3aa99] max-sm:mx-auto max-sm:max-w-[330px] max-sm:text-[clamp(12px,3.45vw,13px)] max-sm:leading-7 max-sm:tracking-[0.025em]">
              {hero.subcopy}
            </p>

            <a
              href={hero.ctaHref}
              className="ctea-sketch-cta group mx-auto mt-16 flex min-h-[92px] w-[356px] max-w-full flex-col items-center justify-center border border-[#c5a15d] bg-[#122b43] !text-white shadow-[0_0_0_4px_#122b43,0_0_0_5px_#c5a15d,0_10px_24px_rgba(33,42,47,.18)] transition-[background,box-shadow] duration-200 hover:bg-[#183650] hover:shadow-[0_0_0_4px_#183650,0_0_0_5px_#c5a15d,0_12px_27px_rgba(33,42,47,.18)] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#9b742e] dark:border-[#c6a465] dark:bg-[#f1eade] dark:!text-[#122b43] dark:shadow-[0_0_0_4px_#f1eade,0_0_0_5px_#c6a465,0_10px_24px_rgba(2,8,14,.5)] dark:hover:bg-[#fff8ec] dark:hover:shadow-[0_0_0_4px_#fff8ec,0_0_0_5px_#c6a465,0_12px_27px_rgba(2,8,14,.5)] dark:focus-visible:outline-[#c6a465] motion-reduce:transition-none max-sm:mt-8 max-sm:min-h-[80px] max-sm:w-[290px]"
            >
              <div className="flex flex-row justify-center items-center gap-4">
                <CtaDivider />
                <div className="font-['Noto_Serif_TC','Songti_TC',serif] text-[27px] tracking-[0.15em] max-sm:text-2xl">
                  {hero.ctaLabel}
                </div>
                <CtaDivider />
              </div>
            </a>
          </div>
        </div>
      </div>
      {footer}
    </section>
  )
}

function CtaDivider() {
  return (
    <span
      aria-hidden="true"
      className="block h-px w-6 bg-[#c5a15d] dark:bg-[#c6a465]"
    />
  )
}

function ThemeAwareHeroBackground({ hero }: { hero: HomepageHero }) {
  return (
    <>
      <HeroGateImage
        imageKind="bg"
        src={hero.bg}
        alt="sketch-ivory-bg"
        aria-hidden="true"
        decoding="async"
        className="h-full w-full object-cover object-bottom-right opacity-95 dark:hidden"
      />
      <HeroGateImage
        imageKind="bg"
        src={hero.bgDark}
        alt="sketch-ivory-bg-dark"
        aria-hidden="true"
        decoding="async"
        className="hidden h-full w-full object-cover object-bottom-right opacity-50 dark:block"
      />
    </>
  )
}
