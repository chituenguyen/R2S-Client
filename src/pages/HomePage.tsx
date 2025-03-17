import { useQuery } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import * as product from "../redux/api/axios";
import { Product } from "../redux/types/user.types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCT_PER_PAGE = 8;

function SupportSection() {
  const services = [
    {
      src: "src/images/fast-delivery-icon-free-vector.jpg",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      src: "src/images/customer service.png",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      src: "src/images/png-clipart-money-back-guarantee-computer-icons-search-button-miscellaneous-service.png",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="py-10 border-b my-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center md:w-1/3 px-4">
            <img src={service.src} alt={service.title} className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const { data, isPending, error } = useQuery({ queryKey: ["product"], queryFn: product.getProductList });
  const navigate = useNavigate();
  const currentProductList = useMemo(() => (data ? data.slice(0, PRODUCT_PER_PAGE) : []), [data]);

  const handleAddToCart = (product: Product) => {
    console.log(`Thêm sản phẩm vào giỏ hàng: ${product.name}`);
  };

  const Skeleton = () => (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: PRODUCT_PER_PAGE }).map((_, index) => (
        <div key={index} className="bg-gray-200 h-40 rounded-md"></div>
      ))}
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto py-6">
      <header className="mb-10">
        <div className="flex items-center">
          <div className="bg-red-500 w-2 h-8 mr-2"></div>
          <div className="text-red-500 font-medium text-sm">Our Products</div>
        </div>
        <h2 className="text-4xl font-semibold mt-2">Explore Our Products</h2>
      </header>

      <section>
        {isPending ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProductList.length === 0 ? (
              <p className="text-gray-600">Không có sản phẩm nào.</p>
            ) : (
              currentProductList.map((product: Product) => (
                <div
                  key={product.id}
                  className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                  onClick={() => navigate(`/postpage/${product.id}`)}
                >
                  <div className="bg-gray-100 p-4 relative">
                    <div className="p-10 flex justify-center items-center">
                      <img
                        src={product.images[0] || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="h-[180px] w-[115px] object-contain"
                      />
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <CiHeart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500 transition" />
                      <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500 transition" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex text-yellow-400 mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < product.rate ? "text-yellow-500" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <div className="text-red-500 font-bold">${product.price}</div>
                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                  </div>

                  {product.stock > 0 ? (
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="absolute bottom-1/2 left-0 w-full bg-black text-white py-3 text-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Add To Cart
                    </button>
                  ) : (
                    <span className="text-red-500 font-medium">Out of stock</span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </section>
      <div className="text-center mt-6">
        <button className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600">
          View All Products
        </button>
      </div>
      <SupportSection />
    </div>
  );
}

export default HomePage;