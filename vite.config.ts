import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const allowedHosts = env.DEV_SERVER_ALLOWED_HOSTS?.split(',')
    .map((h) => h.trim())
    .filter(Boolean)

  return {
    resolve: { tsconfigPaths: true },
    server: {
      port: 4321,
      host: true,
      ...(allowedHosts?.length ? { allowedHosts } : {}),
    },
    plugins: [
      devtools(),
      cloudflare({ viteEnvironment: { name: 'ssr' } }),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          crawlLinks: true,
          // leave CMS SPA and API routes out of prerender
          filter: ({ path }) =>
            !path.startsWith('/admin') && !path.startsWith('/api'),
        },
      }),
      viteReact(),
    ],
  }
})
