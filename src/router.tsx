import { createRouter, Navigate } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { QueryClient } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

export type RouterContext = {
  queryClient: QueryClient
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    scrollRestoration: true,
    notFoundMode: 'root',
    defaultNotFoundComponent: () => Navigate({ to: '/' }),
    defaultErrorComponent: () => Navigate({ to: '/' }),
    defaultPendingComponent: () => (
      <div className="w-full h-dvh bg-gray-900 text-white font-bold text-3xl flex flex-col justify-center items-center">
        Loading...
      </div>
    )
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}
