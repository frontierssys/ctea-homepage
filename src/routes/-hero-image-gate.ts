export const HERO_IMAGE_LOADED_CLASS = 'ctea-sketch-hero-image--loaded'

export const HERO_IMAGE_SELECTOR = '.ctea-sketch-rider-image, .ctea-sketch-bg-image'

function onHeroImageLoad(img: HTMLImageElement) {
  img.classList.add(HERO_IMAGE_LOADED_CLASS)
}

function onHeroImageError(img: HTMLImageElement) {
  img.classList.add(HERO_IMAGE_LOADED_CLASS)
}

/** Wire cache check + native load/error listeners (hydration-independent). */
export function wireHeroImage(img: HTMLImageElement | null) {
  if (!img || img.classList.contains(HERO_IMAGE_LOADED_CLASS)) return

  if (img.complete && img.naturalWidth > 0) {
    img.classList.add(HERO_IMAGE_LOADED_CLASS)
    return
  }

  const mark = () => onHeroImageLoad(img)
  img.addEventListener('load', mark, { once: true })
  img.addEventListener('error', () => onHeroImageError(img), { once: true })
}

/** Runs before React hydration; keeps gate independent of hydration timing. */
export function getHeroImageGateScript() {
  const loadedClass = JSON.stringify(HERO_IMAGE_LOADED_CLASS)
  const selector = JSON.stringify(HERO_IMAGE_SELECTOR)

  return `(function(){var c=${loadedClass},s=${selector};function w(i){if(!i||i.classList.contains(c))return;if(i.complete&&i.naturalWidth>0){i.classList.add(c);return;}i.addEventListener("load",function(){i.classList.add(c)},{once:true});i.addEventListener("error",function(){i.classList.add(c)},{once:true});}function r(){document.querySelectorAll(s).forEach(w);}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",r);else r();})();`
}
