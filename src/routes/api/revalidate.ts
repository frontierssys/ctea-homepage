import { createFileRoute } from '@tanstack/react-router'

/**
 * On-demand CDN purge (ISR revalidation).
 *
 * POST /api/revalidate
 * Body: { "path": "/", "secret": "..." }
 *
 * Secrets / vars (Cloudflare Worker):
 *   wrangler secret put REVALIDATE_SECRET
 *   wrangler secret put CF_API_TOKEN
 *   wrangler.jsonc vars: CF_ZONE_ID, SITE_URL
 *
 * Purge itself is a Cloudflare Cache API call — credentials live in CF,
 * but the trigger endpoint lives in this repo.
 * 
 * ref: https://tanstack.com/start/latest/docs/framework/react/guide/isr#on-demand-revalidation
 */
export const Route = createFileRoute('/api/revalidate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { path, secret } = await request.json()

        // Verify secret token
        if (secret !== process.env.REVALIDATE_SECRET) {
          return Response.json({ error: 'Invalid token' }, { status: 401 })
        }

        // Trigger CDN purge via Cloudflare Cache API
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/purge_cache`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              files: [`${process.env.SITE_URL}${path}`],
            }),
          },
        )

        return Response.json({ revalidated: true })
      },
    },
  },
})
