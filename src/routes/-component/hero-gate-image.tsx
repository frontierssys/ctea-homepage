import type { ComponentProps } from 'react'
import { cn } from '#/lib/utils'
import { wireHeroImage } from '../-hero-image-gate'

type HeroGateImageProps = ComponentProps<'img'> & {
  imageKind: 'rider' | 'bg'
}

export function HeroGateImage({ imageKind, className, ...props }: HeroGateImageProps) {
  return (
    <img
      {...props}
      suppressHydrationWarning
      ref={wireHeroImage}
      className={cn(
        imageKind === 'rider' ? 'ctea-sketch-rider-image' : 'ctea-sketch-bg-image',
        className,
      )}
    />
  )
}
