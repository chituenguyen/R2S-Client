import React from "react"
import { createRoot } from "react-dom/client"
import { Router } from "./router/Router"
import { Layout } from "./components/Layout/Layout"
import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import Header from "./components/Layout/header"


const queryClient = new QueryClient()
createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
    </QueryClientProvider>
  </React.StrictMode>
)
