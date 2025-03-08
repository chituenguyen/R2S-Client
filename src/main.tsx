// 
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import { Router } from './router/Router'
import { Layout } from './components/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './App.css'

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Router />
          </Layout>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)