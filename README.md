# CTEA Homepage

TanStack Start site for 中華民國馬術協會, with Sveltia CMS editing content under `content/`.

## Getting Started

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321`  
CMS: `http://localhost:4321/admin/`

For live CMS preview styles/scripts while iterating on preview templates:

```bash
npm run dev:admin-preview
```

## Building For Production

```bash
npm run build
```

This builds the admin preview bundle, then the site (including content-collections + prerender).

```bash
npm run deploy
```

## Static content pipeline (build-time, not runtime)

Announcement bodies are **not** Markdown-parsed on each request. CMS writes source files; Vite / content-collections turn them into HTML **at build (and during `vite dev` startup / on file change)**. The deployed site reads that prebuilt data.

### CMS → source of truth

Sveltia CMS writes JSON under git, for example:

| Collection | Path | Role |
| --- | --- | --- |
| `event` | `content/event.json` | `/events` list page chrome (title, description) |
| `events` | `content/events/*.json` | One file per announcement; `content` field is **Markdown** |

Editors do not write into `.content-collections/`. That folder is generated and gitignored.

### Build-time pipeline

Configured in `content-collections.ts` (Vite plugin `@content-collections/vite`):

1. Scan `content/events/*.json`
2. Validate with Zod
3. `transform`: `renderMarkdown()` (`src/lib/markdown.ts` — unified / remark / rehype) converts Markdown → **HTML string**
4. Emit `.content-collections/generated/` (e.g. `allEvents.js`)

```text
content/events/*.json          (Markdown in `content`)
        ↓  content-collections (build / vite)
.content-collections/generated  (HTML in `content`)
        ↓  import { allEvents } from '.content-collections/generated'
src/lib/content/get-events.ts
        ↓  route loaders
EventDetailView → <Markdown />  (dangerouslySetInnerHTML)
```

So:

- **Dynamic at request time?** No — listing and bodies come from the generated module bundled with the app (plus prerendered HTML pages).
- **When does Markdown run?** Build / dev content rebuild, not in the browser for the public site.
- **CMS live preview** is separate: the admin preview bundle may call `renderMarkdown` on the in-progress draft so editors see updates before publish/build.

### Key files

| File | Purpose |
| --- | --- |
| `content-collections.ts` | Collection schema + Markdown → HTML transform |
| `src/lib/markdown.ts` | Shared Markdown processor |
| `src/components/markdown.tsx` | Renders prebuilt HTML via `dangerouslySetInnerHTML` |
| `src/lib/content/get-events.ts` | Reads `allEvents` for routes |
| `public/admin/config.yml` | Sveltia CMS collections |
