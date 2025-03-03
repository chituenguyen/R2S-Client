import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Router } from './router/Router'
import { Layout } from './components/Layout'
import './App.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  </React.StrictMode>
)
