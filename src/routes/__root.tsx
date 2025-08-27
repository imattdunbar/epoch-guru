import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { RouterContext } from '@/router'
import { defaultHead } from '@/util/seo'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: defaultHead,
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
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
          toastOptions={{ style: { width: 'fit-content', marginInline: 'auto' } }}
        />
        <Scripts />
      </body>
    </html>
  )
}
