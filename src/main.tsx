import { BrowserRouter } from "react-router-dom"
import React from "react"
import { createRoot } from "react-dom/client"
import { Router } from "./router/Router"
import { Layout } from "./components/Layout/Layout"
import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import {ToastProvider} from "../src/components/context/ToastContext"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const queryClient = new QueryClient()
createRoot(document.getElementById("root") as HTMLElement).render(
  <ToastProvider>
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()} >
      <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
  <ToastContainer />
  </ToastProvider>
)
