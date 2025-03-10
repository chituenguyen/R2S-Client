import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Router } from "./router/Router"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Layout } from "./components/Layout"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./App.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <Router />
        </Layout>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
