import {createRoot} from "react-dom/client";
import * as React from "react";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
)