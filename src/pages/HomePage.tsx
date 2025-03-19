import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/Product";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3003/api/products")
      .then((response) => response.json())
      .then((data) => {
      setProducts(data.data); 
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-5xl text-gray-1000">Explore Our Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array(8).fill(null).map((_, index) => <ProductCard key={index} />)
            : products.map((product) => (
                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                  <ProductCard
                    name={product.name}
                    image={product.images}
                    price={product.price}
                    rating={product.rating}
                    reviews={product.reviews}
                  />
                </div>
              ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
         <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full">
            <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full">
              <img src="/assets/Icon/free-delivery.png" alt="Fast Delivery" className="w-10 h-10 invert" />
            </div>
          </div>
            <h3 className="text-lg font-semibold mt-4">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-600">Free delivery for all orders over $140</p>
          </div>

        <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full">
            <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full">
              <img src="/assets/Icon/customer-service.png" alt="Customer Service" className="w-10 h-10 invert" />
            </div>
          </div>
            <h3 className="text-lg font-semibold mt-4">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-600">Friendly 24/7 customer support</p>
          </div>

        <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full">
            <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full">
              <img src="/assets/Icon/money-back.png" alt="Money Back" className="w-10 h-10 invert" />
            </div>
          </div>
            <h3 className="text-lg font-semibold mt-4">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;