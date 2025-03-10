import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Router } from './router/Router'
import { Layout } from './components/Layout'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()} >
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
