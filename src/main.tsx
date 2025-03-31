import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPages";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPages"; 
import MyAccountPage from "./pages/MyAccountPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="main-content flex-1 flex flex-col"> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/my-account" element={<MyAccountPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
          <Footer className="mt-auto" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
