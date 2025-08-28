import { defineConfig, Plugin } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// Necessary for working with SSR routes + no dependency useEffects
// HMR reloads the components but useEffect doesn't run again
const fullReloadAlways: Plugin = {
  name: 'full-reload',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  }
}

const config = defineConfig({
  server: {
    host: true,
    port: 3969
  },
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
      target: 'vercel',
      sitemap: {
        host: 'https://epoch.guru'
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        filter: (page) => {
          // Only prerender home/index page
          return page.path === '/'
        },
        onSuccess: (result) => {
          console.log(`Prerendered path ${result.page.path}`)
        }
      }
    }),
    viteReact(),
    fullReloadAlways
  ]
})

export default config
