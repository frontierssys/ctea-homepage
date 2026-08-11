import { cn } from "#/lib/utils"

export function GradientGlowTopRight() {
  return (
    <div
      id="equestrian-glow-top-right"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-0 h-140",

        // Light：mobile / desktop
        "bg-[radial-gradient(circle_at_78%_16%,rgba(225,207,174,0.22),transparent_46%)]",
        "lg:bg-[radial-gradient(circle_at_78%_16%,rgba(225,207,174,0.38),transparent_46%)]",

        // Dark：mobile / desktop
        "dark:bg-[radial-gradient(circle_at_78%_16%,rgba(190,151,83,0.10),transparent_46%)]",
        "dark:lg:bg-[radial-gradient(circle_at_78%_16%,rgba(190,151,83,0.14),transparent_48%)]"
      )}
      aria-hidden="true"
    />
  )
}