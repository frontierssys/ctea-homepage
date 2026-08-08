import fontsStylesheet from '../fonts.css?url'

/** Self-hosted Barlow Condensed WOFF2 stylesheet. */
export const FONTS_STYLESHEET = fontsStylesheet

/** Inline snippet: load fonts without blocking first paint (print→all trick). */
export const FONTS_NONBLOCKING_SCRIPT = `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(FONTS_STYLESHEET)};l.media='print';l.onload=function(){this.media='all'};document.head.appendChild(l)})();`
