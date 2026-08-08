import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const routerShim = resolve(rootDir, 'src/components/ui/shims/link.tsx')

export default defineConfig({
  publicDir: false,
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  // Compile JSX → Sveltia's global h()/rf() so we share one React with the CMS runtime.
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'rf',
  },
  plugins: [tanstackRouterShim(), tailwindcss()],
  build: {
    outDir: 'public/admin',
    emptyOutDir: false,
    lib: {
      entry: resolve(rootDir, 'src/admin/preview/index.tsx'),
      formats: ['iife'],
      name: 'CteaAdminPreview',
      fileName: () => 'preview-bundle.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'preview-bundle.[ext]',
        inlineDynamicImports: true,
      },
    },
  },
})

/**
 * CMS preview shares Sveltia's React via h()/rf(); TanStack Link needs a
 * Router provider the IIFE does not have. Force every import onto a plain
 * <a> shim (type-only imports like FileRouteTypes are erased).
 */
function tanstackRouterShim(): Plugin {
  return {
    name: 'tanstack-router-preview-shim',
    enforce: 'pre',
    resolveId(id) {
      if (id === '@tanstack/react-router' || id.startsWith('@tanstack/react-router/')) {
        return routerShim
      }
    },
  }
}

