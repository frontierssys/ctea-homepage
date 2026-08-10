import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { FileRouteTypes } from '#/routeTree.gen'

export const Route = createFileRoute('/about')({
  component: AboutLayout,
})

const aboutLinks = [
  {
    label: '協會歷史',
    meta: 'History',
    to: '/about/history',
  },
  {
    label: '協會宗旨',
    meta: 'Mission',
    to: '/about/mission',
  },
  {
    label: '組織章程',
    meta: 'constitution',
    to: '/about/constitution',
  },
  {
    label: '奮鬥願景',
    meta: 'Vision',
    to: '/about/vision',
  },
] as const satisfies Array<{
  label: string
  meta: string
  to: FileRouteTypes['to']
}>

function AboutLayout() {
  return (
    <div className="about-layout relative mx-auto grid w-[min(100%-32px,1440px)] gap-14 py-8 sm:w-[min(100%-48px,1440px)] lg:grid-cols-[minmax(220px,0.24fr)_minmax(0,0.76fr)]">
      <aside
        className="about-motion-rail lg:sticky lg:top-24 lg:self-start lg:pr-8"
        aria-label="About page table of contents"
      >
        <div className="mt-4 grid gap-3">
          {aboutLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="about-link group relative block overflow-hidden border-b border-[rgba(17,17,15,0.18)] pb-3 transition-[border-color,opacity,transform] duration-300 ease-out hover:border-[#8b7254] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b7254]"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b7254]">
                {item.meta}
              </span>
              <span className="mt-1 flex min-h-8 items-center justify-between text-sm font-semibold text-[#11110f]">
                {item.label}
                <span
                  className="pr-2 about-link-arrow transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
              <span className="about-link-glint" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </aside>

      <div className="about-content-panel min-w-0">
        <Outlet />
      </div>

      <style>{`
        .about-layout {
          --about-ease: cubic-bezier(0.19, 1, 0.22, 1);
        }

        .about-link {
          animation: about-link-settle 520ms var(--about-ease) both;
        }

        .about-link:nth-child(2) {
          animation-delay: 70ms;
        }

        .about-link:nth-child(3) {
          animation-delay: 140ms;
        }

        .about-link:nth-child(4) {
          animation-delay: 210ms;
        }

        .about-link-glint {
          position: absolute;
          inset: auto 0 -1px 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #8b7254 34%, transparent 72%);
          transform: translate3d(-102%, 0, 0);
          transition: transform 420ms var(--about-ease);
        }

        .about-link:hover .about-link-glint,
        .about-link:focus-visible .about-link-glint {
          transform: translate3d(102%, 0, 0);
        }

        .about-content-panel {
          animation: about-content-resolve 720ms var(--about-ease) 160ms both;
        }

        @keyframes about-link-settle {
          from {
            opacity: 0;
            transform: translate3d(-14px, 0, 0) scaleX(0.985);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scaleX(1);
          }
        }

        @keyframes about-content-resolve {
          from {
            opacity: 0;
            transform: translate3d(18px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (min-width: 1024px) {
          .about-motion-rail::before {
            content: "";
            position: absolute;
            top: 1rem;
            right: 0;
            bottom: 0;
            width: 1px;
            background: linear-gradient(to bottom, rgba(139, 114, 84, 0.42), rgba(17, 17, 15, 0.08));
            transform-origin: top;
            animation: about-rail-draw 760ms var(--about-ease) both;
          }

          @keyframes about-rail-draw {
            from {
              opacity: 0.3;
              transform: scaleY(0);
            }
            to {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-layout *,
          .about-layout *::before,
          .about-layout *::after {
            animation: none !important;
            transition-duration: 1ms !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
