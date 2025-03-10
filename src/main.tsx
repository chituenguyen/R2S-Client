<<<<<<< HEAD
import React from "react"
import { createRoot } from "react-dom/client"
import { Router } from "./router/Router"
import { Layout } from "./components/Layout/Layout"
import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import Header from "./components/Layout/header"
=======
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Router } from './router/Router'
import { Layout } from './components/Layout'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>>>>>>> 979477986275fad8683d0b36ebef4bc0ac7eec34


const queryClient = new QueryClient()
createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
=======
    <QueryClientProvider client={new QueryClient()} >
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
>>>>>>> 979477986275fad8683d0b36ebef4bc0ac7eec34
    </QueryClientProvider>
  </React.StrictMode>
)
