import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { RouterContext } from '@/router'
import { defaultHead } from '@/util/seo'
import { Toaster } from 'sonner'
import { PostHogProvider } from 'posthog-js/react'

const isDev = import.meta.env.DEV

export const Route = createRootRouteWithContext<RouterContext>()({
  head: defaultHead,
  shellComponent: RootDocument
})

function AppWrapper({ children }: { children: React.ReactNode }) {
  const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN
  const api_host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

  const app =
    !isDev && apiKey ? (
      <PostHogProvider
        apiKey={apiKey}
        options={{
          api_host,
          defaults: '2026-01-30'
        }}
      >
        {children}
      </PostHogProvider>
    ) : (
      children
    )

  return (
    <>
      {/* The actual app, with or without Posthog */}
      {app}

      {/* Global toast/sonner */}
      <Toaster
        theme="dark"
        className="flex justify-center"
        position="bottom-center"
        visibleToasts={1}
        // bg-stone-800 = #292524
        style={{ '--normal-border': 'transparent', '--normal-bg': '#292524' } as React.CSSProperties}
        toastOptions={{ style: { width: 'fit-content', maxWidth: '320px', marginInline: 'auto' } }}
      />

      {/* Regular scripts */}
      <Scripts />

      {/* Devtools */}
      {isDev && (
        <TanStackDevtools
          config={{ hideUntilHover: true }}
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />
            },
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
      )}
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
