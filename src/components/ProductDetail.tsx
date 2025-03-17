import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  // TODO: Should use useQuery
  useEffect(() => {
    fetch(`http://localhost:3003/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data[0])
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  console.log(product)
  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>  
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500">{product.reviews} Reviews | ⭐ {product.rating}</p>
          <p className="text-2xl font-semibold text-red-500 my-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <span className="font-semibold">Colours:</span>
            {/* <div className="flex space-x-2 mt-2">
              {product.colors?.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div> */}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Size:</span>
            {/* <div className="flex space-x-2 mt-2">
              {product.sizes?.map((size) => (
                <button key={size} className="px-3 py-1 border border-gray-400 rounded-md">
                  {size}
                </button>
              ))}
            </div> */}
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;