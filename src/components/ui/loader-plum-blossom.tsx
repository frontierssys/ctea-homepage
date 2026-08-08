import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '#/lib/utils'

/** ref: https://github.com/Paidax01/math-curve-loaders */
const CONFIG = {
  rotate: true,
  particleCount: 78,
  trailSpan: 0.2,
  durationMs: 5400,
  rotationDurationMs: 28000,
  pulseDurationMs: 4600,
  strokeWidth: 4.5,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseK: 5,
  roseScale: 2,
  /** Mid-pulse detail scale for a static rose path used by offset-path. */
  staticDetailScale: 0.76,
} as const

function getPoint(progress: number, detailScale: number) {
  const t = progress * Math.PI * 2
  const a = CONFIG.roseA + detailScale * CONFIG.roseABoost
  const r =
    a * (CONFIG.roseBreathBase + detailScale * CONFIG.roseBreathBoost) * Math.cos(CONFIG.roseK * t)

  return {
    x: 50 + Math.cos(t) * r * CONFIG.roseScale,
    y: 50 + Math.sin(t) * r * CONFIG.roseScale,
  }
}

function buildRosePath(detailScale: number, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = getPoint(index / steps, detailScale)

    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  }).join(' ')
}

const ROSE_PATH = buildRosePath(CONFIG.staticDetailScale)

const PARTICLES = Array.from({ length: CONFIG.particleCount }, (_, index) => {
  const tailOffset = index / (CONFIG.particleCount - 1)
  const fade = (1 - tailOffset) ** 0.56

  return {
    delayMs: -tailOffset * CONFIG.trailSpan * CONFIG.durationMs,
    radius: 0.9 + fade * 2.7,
    opacity: 0.04 + fade * 0.96,
  }
})

type LoaderPlumBlossomSvgProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  label?: string
  showLabel?: boolean
}

export function LoaderPlumBlossom({
  className,
  label = 'Loading',
  showLabel = false,
  ...props
}: LoaderPlumBlossomSvgProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'inline-grid justify-items-center gap-3 text-[#a77d35] dark:text-[#c6a465]',
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes plum-svg-rotate {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes plum-svg-breathe {
          0%,
          100% {
            transform: scale(0.88);
          }
          50% {
            transform: scale(1);
          }
        }

        @keyframes plum-svg-trail {
          to {
            offset-distance: 100%;
          }
        }

        .plum-svg-rotate,
        .plum-svg-breathe {
          transform-box: view-box;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .plum-svg-rotate {
          animation: plum-svg-rotate ${CONFIG.rotationDurationMs}ms linear infinite;
        }

        .plum-svg-breathe {
          animation: plum-svg-breathe ${CONFIG.pulseDurationMs}ms ease-in-out infinite;
        }

        .plum-svg-particle {
          offset-path: path("${ROSE_PATH}");
          offset-rotate: 0deg;
          offset-distance: 0%;
          will-change: offset-distance, opacity;
          animation: plum-svg-trail ${CONFIG.durationMs}ms linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .plum-svg-rotate,
          .plum-svg-breathe,
          .plum-svg-particle {
            animation: none !important;
          }

          .plum-svg-particle {
            opacity: 0 !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="size-24 overflow-visible drop-shadow-[0_10px_22px_rgba(89,60,20,.12)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,.26)]"
      >
        <g className={CONFIG.rotate ? 'plum-svg-rotate' : ''}>
          <g className="plum-svg-breathe">
            <path
              d={ROSE_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={CONFIG.strokeWidth}
              opacity="0.1"
            />
            {PARTICLES.map((particle, index) => (
              <circle
                key={index}
                className="plum-svg-particle"
                cx={0}
                cy={0}
                r={particle.radius}
                fill="currentColor"
                opacity={particle.opacity}
                style={{ animationDelay: `${particle.delayMs}ms` }}
              />
            ))}
          </g>
        </g>
      </svg>

      <span
        className={cn(
          "text-xs tracking-[0.2em] text-[#7e5f2e] uppercase dark:text-[#a99267]",
          showLabel ? 'block' : 'sr-only',
        )}
      >
        {label}
      </span>
    </div>
  )
}
