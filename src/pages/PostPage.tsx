import React, { ReactElement } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Layout/Footer';
import ProductDetail from './ProductDetail';

function Postpage(): ReactElement {
  return (
    <div className="">
      <Header />
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default Postpage;