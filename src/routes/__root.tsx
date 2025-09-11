import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { RouterContext } from '@/router'
import { defaultHead } from '@/util/seo'
import { Toaster } from 'sonner'

const isDev = import.meta.env.DEV

export const Route = createRootRouteWithContext<RouterContext>()({
  head: defaultHead,
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        {children}
        <Toaster
          theme="dark"
          className="flex justify-center"
          position="bottom-center"
          visibleToasts={1}
          // bg-stone-800 = #292524
          style={{ '--normal-border': 'transparent', '--normal-bg': '#292524' } as React.CSSProperties}
          toastOptions={{ style: { width: 'fit-content', maxWidth: '320px', marginInline: 'auto' } }}
        />
        <Scripts />

        {!isDev && (
          <script
            defer
            src="https://stats.mattdunbar.io/script.js"
            data-website-id="c44c0322-7d74-4d5b-bc4a-8d4ef2abca65"
          ></script>
        )}
      </body>
    </html>
  )
}
