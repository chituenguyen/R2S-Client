import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPages";
import ProductDetailPage from "./pages/ProductDetailPage";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element ={<ProductDetailPage />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


