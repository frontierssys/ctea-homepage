# CTEA Homepage

TanStack Start site for 中華民國馬術協會 homepage, with Sveltia CMS editing content under `content/`.

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

## Deployment

```bash
npm run build
npm run deploy
```

### Worker secrets / vars (for `/api/revalidate`)

Uncomment and fill `vars` in `wrangler.jsonc`, then set secrets (do not commit):

```bash
npx wrangler secret put REVALIDATE_SECRET
npx wrangler secret put CF_API_TOKEN
```

| Name | Where | Purpose |
| --- | --- | --- |
| `SITE_URL` | `wrangler.jsonc` `vars` | Public origin |
| `CF_ZONE_ID` | `wrangler.jsonc` `vars` | Zone to purge |
| `REVALIDATE_SECRET` | secret | Shared token; must match webhook / CI body |
| `CF_API_TOKEN` | secret | Cloudflare API token with Cache Purge |

### GitHub webhook → `POST /api/revalidate` (on `content/` changes)

CMS writes under `content/`. After those files land on the default branch, trigger CDN purge via the Worker endpoint:

```http
POST https://<your-worker-host>/api/revalidate
Content-Type: application/json

{ "path": "/events", "secret": "<REVALIDATE_SECRET>" }
```

`path` should be the page URL path to purge (e.g. `/`, `/events`, `/events/events-1`).

**Recommended setup (path-filtered):** add a GitHub Action (or equivalent CI webhook job) that runs only when `content/**` changes, then `curl`s the endpoint above. Native GitHub → Settings → Webhooks fire on whole-repo pushes and send GitHub’s own payload, which this route does not accept—so prefer Actions with:

```yaml
on:
  push:
    paths:
      - 'content/**'
```

Manual check:

```bash
curl -X POST "https://<your-worker-host>/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"path":"/","secret":"<REVALIDATE_SECRET>"}'
```

Note: `/api/revalidate` only purges CDN cache for the given path. It does not rebuild content-collections / prerender output—new CMS copy still needs `npm run build` + deploy (or CI that does both) before purge is useful.

## Ref: Static content pipeline (build-time, not runtime)

Announcement bodies are **not** Markdown-parsed on each request. CMS writes source files; Vite / content-collections turn them into HTML **at build (and during `vite dev` startup / on file change)**. The deployed site reads that prebuilt data.

### CMS → source of truth

Sveltia CMS writes content under git, for example:

| Collection | Path | Role |
| --- | --- | --- |
| `event` | `content/event.json` | `/events` list page chrome (title, description) |
| `events` | `content/events/*.md` | One file per announcement; YAML front matter + Markdown body (`content`) |

Editors do not write into `.content-collections/`. That folder is generated and gitignored.

### Build-time pipeline

Configured in `content-collections.ts` (Vite plugin `@content-collections/vite`):

1. Scan `content/events/*.md`
2. Parse YAML front matter + body (`parser: 'frontmatter'`)
3. Validate with Zod
4. `transform`: `renderMarkdown()` (`src/lib/markdown.ts` — unified / remark / rehype) converts Markdown body → **HTML string**
5. Emit `.content-collections/generated/` (e.g. `allEvents.js`)

```text
content/events/*.md            (front matter + Markdown body)
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
