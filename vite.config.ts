import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import {defineConfig} from 'vite'
import {TanStackRouterVite} from "@tanstack/router-vite-plugin"

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/client/main.tsx',
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/[name]-[hash].js',
          }
        }
      },
      plugins: [
        TanStackRouterVite()
      ]
    }
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom']
      },
      plugins: [
        pages(),
        devServer({
          entry: 'src/index.tsx',
        })
      ]
    }
  }
})