import { useEffect, useRef, useState, type ComponentProps } from 'react'

type DeferredEmbedProps = {
  src: string
  title: string
  label: string
  allow?: string
  referrerPolicy?: ComponentProps<'iframe'>['referrerPolicy']
  allowFullScreen?: boolean
  /** Optional poster shown on the facade before the iframe loads. */
  poster?: string
  iframeClassName?: string
}

/**
 * Keeps third-party iframes out of the initial network waterfall.
 * Loads when near the viewport (or immediately on user click).
 */
export function DeferredEmbed({
  src,
  title,
  label,
  allow,
  referrerPolicy,
  allowFullScreen,
  poster,
  iframeClassName = 'absolute inset-0 h-full w-full border-0',
}: DeferredEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) return
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setActive(true)
        observer.disconnect()
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [active])

  return (
    <div ref={rootRef} className="absolute inset-0">
      {active ? (
        <iframe
          src={src}
          title={title}
          className={iframeClassName}
          allow={allow}
          referrerPolicy={referrerPolicy}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a2a38] text-[#fbf6ed] transition-colors hover:bg-[#213140] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#c5a15d]"
          aria-label={label}
        >
          {poster ? (
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <span className="relative z-10 grid size-14 place-items-center rounded-full border border-[rgba(197,161,93,.75)] bg-[rgba(9,23,37,.72)]">
            <span
              className="ml-0.5 size-0 border-y-7 border-y-transparent border-l-12 border-l-current"
              aria-hidden="true"
            />
          </span>
          <span className="relative z-10 font-sport text-overline uppercase tracking-[0.12em]">
            {label}
          </span>
        </button>
      )}
    </div>
  )
}
