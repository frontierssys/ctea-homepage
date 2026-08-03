import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  publicDir: false,
  resolve: { tsconfigPaths: true },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  // Compile JSX → Sveltia's global h()/rf() so we share one React with the CMS runtime.
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'rf',
  },
  plugins: [tailwindcss()],
  build: {
    outDir: 'public/admin',
    emptyOutDir: false,
    lib: {
      entry: resolve(rootDir, 'src/admin/preview-entry.tsx'),
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
