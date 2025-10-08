import { defineConfig, Plugin } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Nitro V2
// https://tanstack.com/start/latest/docs/framework/react/hosting#nitro
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

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
    nitroV2Plugin({
      preset: 'vercel'
    }),
    viteReact(),
    fullReloadAlways
  ]
})

export default config
