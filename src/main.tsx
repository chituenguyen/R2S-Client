import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Layout } from "./components/Layout";
import { Router } from "./router/Router";
import Header from "./components/Header/Header";
import Footer from "./components/Layout/Footer";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
        <ToastContainer />
          <Header />
          <Router />
          <Footer />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);