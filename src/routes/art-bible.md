# CTEA Sketch Ivory Art Bible

This document defines the visual and interaction system for the current CTEA homepage. It aligns with the `ctea-homepage` implementation (`styles.css`, masthead, hero carousel, and landing sections). Use it as the reference when building or revising pages.

The experience should feel like a formal equestrian association presented through an ivory commemorative program: institutional, disciplined, spacious, and quietly premium. It also allows modern sporting energy through sans-serif display type and condensed Latin labels for clarity and competitive rhythm. It must not drift into generic luxury branding, rustic equestrian styling, dashboard-like product UI, or card-heavy layouts.

Implementation references:

- Tokens / type scale: `src/styles.css`
- Navigation: `src/components/top-nav-bar/`
- Hero: `src/components/hero-carousel/`
- Landing sections: `src/routes/-component/landing-content.tsx`

## Document Scope and Usage

- This document is the reference for visual direction and acceptance. `src/styles.css` is the technical source of truth for color, typography, and sizing tokens. If they disagree, confirm the design intent and update both the document and implementation rather than preserving two rule sets.
- Rules are applied in this order: **core direction and exclusions → shared tokens → component patterns → page-specific exceptions**. A page exception requires a content or functional reason, not novelty alone.
- Tailwind classes and values in this document describe the current recipe, not immutable brand meaning. Refactors may change the implementation while preserving the visual role, proportion, and interaction result.
- For a new page, select an appropriate section character and existing pattern before composing the layout. Do not copy a complete homepage composition by default.
- The current scope is the public website and homepage experience; it does not cover the CMS administration interface.

## Core Direction

- Combine the authority of a national sporting institution with editorial refinement, using modern sans display type for competitive clarity.
- Treat imagery, typographic roles, fine rules, and negative space as the primary design materials.
- Use equestrian and architectural motifs as evidence of identity, not decorative wallpaper.
- Keep compositions calm and intentional. Each section should communicate one primary idea.
- Premium quality comes from proportion, restraint, crop discipline, and role-based typography rather than gloss, blur, or excessive ornament.
- Preserve the tension between photographic realism (hero / image bands) and paper-based institutional storytelling (editorial sections, sketch textures).
- Light mode is the default worldview; dark mode is a first-class peer and must be designed in tandem.

## Palette

### Light Primary Colors

- **Warm paper:** `#fbf6ed`
  - Dominant page background and text-led sections (`--background`).
- **Header ivory:** `#fbf8f1` (commonly `rgba(251,248,241,.92)`)
  - Sticky masthead and translucent paper utility surfaces.
- **Page ivory:** `#f8f2e8`
  - Warm transitional section surfaces (for example social).
- **Primary ink:** `#151310`
  - Headings, navigation, and high-priority Chinese copy (`--foreground`).
- **Deep navy:** `#122b43`
  - Authority panels, video section grounds, icon hover fills; footer may use `#11283e`.
- **Antique gold:** `#b68c43` to `#bd9650`
  - Crests, fine rules, borders, and ceremonial emphasis.
- **Statement gold:** `#a77d35`
  - Kickers, selected emphasis, link hover, active filters; hero uses the brighter `#d0ae6d`.

### Light Supporting Colors

- **Muted body ink:** `#62615e`
- **Wordmark brown:** `#7e5f2e` (English brand line, dates, low-priority labels)
- **CTA / ornament gold:** `#c5a15d` (fine accents inside navy fields)
- **Focus gold:** `#9b742e` (`:focus-visible` outlines)
- **Gold separators:** antique gold at roughly `38-65%` opacity (for example `rgba(182,140,67,.38)`)
- **Warm shadow:** low-opacity brown, for example `0 4px 20px rgba(78,58,27,.06)` and `0 20px 55px rgba(78,58,27,.07)`

### Hero-Only Colors

- **Hero ground:** `#091725`
- **Hero copy:** `#fffaf0` (supporting copy near `rgba(255,250,240,.82)`)
- **Hero gold:** `#d0ae6d`
- **Hero focus gold:** `#f3dbad`
- **Scrim:** `rgb(5 15 25 / 76% | 48% | 20%)` (see `hero-carousel/style.css`)

### Dark Mode

- **Page ground:** `#0b1825`
- **Foreground:** `#f1eade`
- **Header:** `rgba(18,34,49,.92)` with rules / separators `#3a4752`
- **Panels:** `#122231`, `#172a3c`, `#213140`
- **Gold accents:** `#c6a465`, `#ddc28d`
- **Wordmark / meta:** `#a99267`
- **Muted body:** `#b3aa99`
- **Shadow:** for example `0 4px 20px rgba(2,8,14,.25)`

### Color Rules

- Pure white is too modern and sterile; pure black is too severe. The hero may use near-white `#fffaf0` and deep scrims; editorial regions stay on warm ivory / near-ink.
- Navy may be used for controlled full-width authority bands (video, footer), but not as the default ground for every section.
- Gold is structural punctuation and emphasis; large gold fills are limited to small control active states (for example filter chips), never full section fills.
- Light and dark modes must both preserve contrast and the same gold / navy authority language.
- Avoid bright metallic gold, cool product gray, saturated blue, emerald, red accents, neon, and strong multicolor gradients.

## Typography Rules

Typography follows the role map in `styles.css`. Components should combine one font role with one text role, for example `font-display text-hero`.

### Font Roles

| Role | Stack | Use |
|------|-------|-----|
| **brand** | `Songti TC`, `PMingLiU`, ui-serif, Georgia, serif | Association Chinese name only |
| **display** | `PingFang TC`, `Microsoft JhengHei`, sans-serif | Hero / section Chinese headlines |
| **body** | Same CJK sans | Navigation, reading text, controls, button labels |
| **sport** | `Barlow Condensed` + CJK sans | English kickers, dates, numerals, English brand line |

Loaded web face: Barlow Condensed 600 / 700 (self-hosted). CJK relies on system fonts.

### Text Roles (Tokens)

- **text-hero:** `clamp(2.5rem, 6vw, 6rem)`, line-height `1.08`, tracking `0.02em`, weight `700`
- **text-section:** `clamp(2.125rem, 4vw, 3.75rem)`, line-height `1.15`, tracking `0.035em`, weight `700`
- **text-feature-title:** `clamp(1.5rem, 2.25vw, 2.25rem)`, weight `700`
- **text-card-title:** `1.25rem`, weight `700`
- **text-lead:** `clamp(1rem, 1.25vw, 1.1875rem)`, line-height `1.75`
- **text-body / text-body-sm:** `1rem` / `0.875rem`, line-height about `1.7-1.75`
- **text-brand:** `clamp(1rem, 2vw, 1.8125rem)`, tracking `0.08em`, weight `700`
- **text-nav:** `clamp(0.9375rem, 1.15vw, 1.25rem)`, tracking `0.04em`, weight `700`
- **text-action:** `0.875rem`, tracking `0.07em`, weight `700`
- **text-meta:** `0.8125rem`, tracking `0.055em`
- **text-kicker:** `0.75rem`, tracking `0.16em`, weight `700`, usually uppercase
- **text-overline:** `0.6875rem`, tracking `0.12em`, weight `700`

### Typesetting Habits

- Section heading pattern: English sport kicker → Chinese display title → English sport meta.
- Hero titles may use intentional two-line breaks; the second line may use hero gold.
- Long prose stays in a narrower editorial measure with comfortable line-height; keep one-off type sizes out of component class names.
- Avoid calligraphic faces, italic luxury scripts, geometric display novelties, and heavy multi-layer text effects.

## Spacing Rules

- Use a `4px / 8px` detail rhythm; section vertical spacing commonly `py-24 md:py-32 lg:py-36` (about `96 / 128 / 144px`).
- Horizontal gutters: content often `px-5 md:px-10 lg:px-16`; masthead reference `px-11` / `px-7` / `px-4`.
- Keep interactive targets at least about `44px` (`min-h-11`); nav links about `min-h-12`; hero CTA about `min-h-13`.
- Major content groups should have visible air. Do not fill emptiness with decoration.
- Hero copy hierarchy reference: kicker rule → title `mt-6` → description `mt-5` → CTA `mt-7`.
- Fine rules may organize content; bordered panels are reserved for cases like social embeds.

## Layout Principles

### Hero Structure

- Full-bleed photographic carousel, height about `100dvh - header`.
- Left editorial copy sits over a deep scrim; this is not a paper-split hero.
- Desktop scrim: left / bottom gradients; mobile uses a stronger bottom gradient (about `84%` height).
- Content max width about `1600px`; copy column about `max-w-220`.
- Bottom controls: previous / progress indicators / next / play-pause.

### Later Sections

- Prefer asymmetric editorial compositions; avoid unjustified `50 / 50` splits.
- Keep a 12-column mental model on desktop (for example news primary column `col-span-7`).
- Control text measure: display around `max-w-3xl`, body `max-w-2xl`, narrow support `max-w-sm` / `max-w-md`.
- Images may occasionally use `clip-path` (for example elliptical crop) to integrate with paper; curves should feel broad and architectural.
- Event lists favor rows, dates, and fine dividers; social embeds may use low-contrast bordered panels, but must not expand into bento / dashboard layouts.

### Avoid

- Bento grids, floating glass marketing panels, pill-heavy primary navigation, and dashboard layouts.
- Repeating the same composition in every section.
- Dense icon collections, large radii, or heavy shadows.
- Centering every section by default.

## Image Treatment

- Photography should feel formal and disciplined; editorial regions soften slightly against warm paper, while the hero relies on deep scrims for readability.
- Favor dressage, competition, training, arena architecture, heritage venues, ceremonial details, and controlled action.
- Preserve faces, horse heads, posture, tack, and institutional marks when cropping.
- The hero uses `object-fit: cover` with per-slide `imagePosition` rather than default centering.
- Background sketch artwork should remain visible and low contrast; do not cover it with opaque panels.
- When pairing images, match warmth, contrast, and formality.
- Avoid harsh cutouts, saturated sports photography, cold cinematic grading, aggressive zoom crops, and arbitrary duotones.

### Image Acceptance

- **Acceptable:** the action and sightline are clear, the horse retains credible proportions, the background establishes venue or competition context, warmth feels natural, and shadow detail remains visible.
- **Unacceptable:** accidental crops through a horse's head or rider's joints, copy covering faces or marks, horizontally flipping photographs that contain text or crests, or using highly saturated filters to conceal mismatched sources.
- When several photographs share a view, align exposure, white balance, and black levels before applying decorative treatment.
- Record wide-screen and mobile focal points for every key image. If one crop cannot serve both, use separate `imagePosition` values or art-directed sources.

### Visual Baselines

After changing global tokens, navigation, the hero, or a shared section, compare at least these four baseline states:

| Mode | Width | Acceptance focus |
| --- | ---: | --- |
| Light desktop | `1440px` | Masthead proportion, hero focus, ivory warmth, section spacing |
| Dark desktop | `1440px` | Text contrast, gold-rule brightness, dark panel separation |
| Light mobile | `375px` | Wordmark, bottom-aligned hero copy, touch targets, no horizontal scroll |
| Dark mobile | `375px` | Menu surface, focus states, image and scrim legibility |

Also run a `320px` stress test. It is the tolerance floor, not the primary composition target.

## Motion Rules

Motion should reinforce structural direction: carousel settlement, progress advance, and navigation underlines — not stacks of interface elements fading upward.

### Hero Motion

- Slide crossfade: about `400ms`.
- Active image settles from `scale(1.025)` to `scale(1)` over `8s` with `cubic-bezier(0.16, 1, 0.3, 1)` (once per active slide, not an infinite breathing loop).
- Copy enters from about `18px` on the right with fade-in over about `360ms` (about `100ms` delay).
- Progress bar advances with `scaleX`; autoplay cycle is `7000ms`.
- Hover or focus within the carousel should pause autoplay logic (controlled by container state).

### Timing and Easing

- Primary easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hover transitions: generally `180-320ms` (often `200ms`).
- Animate transforms, opacity, and necessary border / background color only.
- Do not add bounce, elastic overshoot, scroll-jacking, large parallax, or infinite full-page background drift.

### Interaction Motion

- Navigation underline opens from center with `scaleX`.
- Hero CTA: fill shifts to gold and text to deep ink; arrow may nudge slightly (about `0.5` unit).
- Mobile menu strokes rotate into a close mark.
- Theme toggle stays a square gold-framed control without translate or scale theatrics.

### Reduced Motion

- Every section must respect `prefers-reduced-motion: reduce` / `motion-reduce:`.
- Reduced-motion mode must show the complete final composition; remove long scales, entrance delays, and decorative travel.
- Do not rely on animation to communicate required state; autoplay must be pausable.

## Accessibility and Interaction States

- Body text and its background must meet WCAG AA contrast of at least `4.5:1`; large text must meet `3:1`. Gold on warm ivory must not carry long passages of small text.
- Every interactive element must be keyboard reachable and expose a visible `:focus-visible` treatment; focus cannot rely on a subtle color shift alone.
- Information revealed on hover must also be available through focus, touch, or an expanded state.
- Carousels must provide previous, next, and pause controls. User interaction must not unexpectedly reclaim focus. State and slide position need understandable accessible names.
- Icon-only buttons require an accessible name; decorative graphics use `aria-hidden="true"`.
- Error, success, selected, and disabled states cannot rely on color alone; pair color with text, an icon, a rule, or another structural cue.
- Use `44 × 44px` as the minimum touch target and preserve adequate separation between adjacent small controls.
- Content and controls must remain complete and usable at `200%` zoom, with keyboard navigation, and under `prefers-reduced-motion`.

## Button and Action Style

### Hero Primary CTA

- Shape: formal square-cornered rectangle.
- Border: `1px` `#d0ae6d`; fill `rgba(9,23,37,.62)` with light `backdrop-blur`.
- Label: `font-body text-action` in `#fffaf0`.
- Minimum height about `52px` (`min-h-13`), slightly shorter on small screens.
- Hover: fill `#d0ae6d`, text `#091725`.
- Focus: visible gold / ivory outline with generous offset.
- Do not translate, scale, bounce, or introduce a glossy sweep on the whole control.

### Editorial Secondary Actions

- Serif is not required; use `font-body text-action` text links with a gold underline.
- Hover shifts toward statement gold; dark mode uses the brighter golds.
- Icon square buttons: gold-framed transparent fill, hover may fill navy.
- Keep one dominant action per section.
- Avoid pills, large radii, gradient fills, and bright gold blocks as the default primary action.

## Navigation Style

- Treat navigation as a formal masthead, not an application toolbar.
- Surface: translucent warm ivory, antique-gold bottom hairline, restrained warm shadow, and light `backdrop-blur`.
- Height tokens: desktop `122px`, `<64rem` → `96px`, `<40rem` → `82px`.
- Brand group sits left: crest, Chinese `font-brand`, English uppercase `font-sport` line.
- Desktop links distribute evenly with short vertical gold hairlines; `font-body text-nav`.
- Hover: label shifts to statement gold and a short underline opens from center.
- Theme toggle sits on the right (light / dark); below the large breakpoint, use the mobile menu.
- Avoid filled active tabs, thick underlines, background pills, and conventional black sticky bars.

### Sticky Navigation

- The masthead stays fixed at the top; show / hide via translate is allowed without changing the visual language.
- Preserve the gold lower rule; keep blur and shadow restrained.

### Mobile Navigation

- Use an about `36px` (`size-9`) square menu control with two fine strokes; rotate into a close mark when open.
- Menu surface: warm ivory / dark panel, fine gold border, restrained shadow.
- Items: `font-body text-nav` with horizontal separators and `min-h-12`.

## Dark Mode Rules

- Theme toggle lives in the masthead and must expose recognizable state (`aria-pressed`).
- Every new section must ship light and dark styles; do not design light-only and invert later.
- Dark mode still uses gold rules and navy authority color — not a cool gray product theme.
- The hero remains a deep photographic stage and does not become a paper-split composition when the theme changes.

## Mobile Adaptation Rules

- Primary structural breakpoints: navigation around `lg`; section stacking often at `md`.
- When image-and-copy splits stack vertically, preserve the image focal subject first.
- On mobile, hero copy aligns toward the bottom and the scrim prioritizes bottom readability.
- Reduce tracking and gutters before shrinking type to unreadable sizes.
- Maintain at least about `44px` touch targets.
- Test at `320px`, `375px`, and tablet widths. No single-character orphans, clipped wordmarks, or horizontal scrolling.
- Do not replace the composition with stacked marketing cards or a simplified generic banner.

## Functional Component Patterns

- **Forms:** keep labels visible rather than replacing them with placeholders. Inputs use the paper-and-rule language; errors sit beside the relevant field and explain how to correct the issue.
- **Tables:** preserve clear headers and row rules. On mobile, prefer controlled horizontal scrolling or a definition-list transformation over compressing content into illegibility.
- **Accordions:** use fine dividers and a clear disclosure icon. The full heading row is interactive and exposes `aria-expanded`.
- **Downloads:** compose rows from document name, format, file size / date, and one download action. Avoid a large card for every file.
- **Long-form / CMS content:** constrain reading measure and provide consistent headings, lists, quotations, tables, links, and captions. CMS content must not introduce arbitrary colors outside brand tokens.
- **Loading, empty, and error:** lead with typography, rules, and concise explanation. Avoid oversized illustration or product-style skeleton treatments that break the institutional voice.
- **Disabled:** reduce emphasis while preserving legibility. If the user needs to understand why an action is unavailable, explain it nearby rather than only lowering opacity.

## Section Character

Later sections should feel like chapters from the same commemorative association publication, reusing type roles and gold-rule rhythm.

- **Events and calendar:** precise and orderly. Strong dates and rows; active filters may use statement gold; registration emphasis may use navy.
- **About and history:** archival and editorial. Broad imagery with narrow text columns, quotations, and milestones.
- **Equestrian education:** clear and instructional without becoming corporate. Disciplined diagrams, measured lists, real training photography.
- **Governance and systems:** formal and legible. Tables or accordions on paper / dark panels with fine borders.
- **Membership:** welcoming but still institutional. Contained navy action area, typography-led benefits, minimal line icons.
- **Downloads:** functional and quiet. Documents as ruled rows rather than large cards.
- **Social:** low-contrast bordered embed panels are allowed; keep shadows restrained and avoid a card wall.
- **Footer:** ceremonial closure. Warm ivory intro plus navy information band, crest, compact association details, and fine gold dividers.

Across the page, maintain a measured cadence between image-led sections, text-led editorial sections, and functional information. The site should become more useful below the hero without losing discipline, heritage, and visual calm.

## Quality Checklist

- Does the section have one clear focal point?
- Does it use the correct font / text roles instead of one-off stacks?
- Are photography crops based on the subject rather than default centering?
- Are gold and navy used with enough restraint to retain authority?
- Are both light and dark treatments complete with sufficient contrast?
- Can a fine rule or whitespace replace an unnecessary card?
- Does hero / navigation motion follow the established language?
- Is the final state complete with reduced motion enabled?
- Does the mobile version preserve hierarchy and subject focus?
- Does the section feel like an equestrian institution rather than a generic luxury brand or product dashboard?
- Are relevant hover, focus, active, disabled, loading, empty, and error states covered?
- Does it pass the four visual baselines and the `320px` stress test?

## Maintenance and Versioning

- Specification version: `0.2`
- Last updated: `2026-08-10`
- Update the Chinese and English documents in the same change. The Chinese document is the semantic authority; the English document supports collaboration and delivery.
- When adding or changing a shared token or pattern, update this document, the implementation source, and at least one representative usage together.
- If a page-level exception appears more than once, consider promoting it into a shared pattern. Remove unused rules instead of retaining ghost guidance.
