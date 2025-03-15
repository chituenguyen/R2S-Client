import Rating from "../../effect/star";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CiHeart, CiStar } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import * as product from "../../api/product"
import { useState } from "react";
import Product from "../../redux/type";



function ProductList({ PRODUCT_PER_PAGE }: { PRODUCT_PER_PAGE: number }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => product.getProductList(),
  });
  console.log("Data:", data);
  // console.log("Data.data:", data.data);
  const [currentProduct, setCurrentProduct] = useState(1);

  // Tính toán các sản phẩm cho trang hiện tại
  const startIndex = (currentProduct - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const currentProductList = data ? data.data.slice(startIndex, endIndex) : [];

  console.log("currentProductList:", currentProductList);
  const totalProduct = data ? Math.ceil(data.length / PRODUCT_PER_PAGE) : 0;
  const slug = 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentProductList.length === 0 ? (
        <p className="text-gray-600">Không có sản phẩm nào.</p>
      ) : (
        currentProductList.map((data: Product) => (
          <div
            key={data.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div className="bg-gray-100 p-4 relative">
              <div className="p-10 flex justify-center items-center">
                <img
                  src={data.images[0]}
                  alt="Cesar Dry Dog Food"
                  className="h-[180px] w-[130px]"
                />
              </div>
              <div
                className="absolute top-4 right-4 flex flex-col space-y-2"
                style={{
                  transform: "translateX(10px)", // Dịch chuyển sang phải
                }}
              >
                <CiHeart className="h-6 w-6 text-gray-600" />
                <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="flex flex-col pb-10">
              <Link to={`/detail/${data.id}`} className="font-semibold text-lg">
                {data.name}
              </Link>
              <div className="flex items-center space-x-3">
                <div className="font-bold text-red-500">${data.price}</div>
                <div className="flex">
                  <Rating rate={data.rate} />
                </div>
                <div className="text-gray-500">({data.stock})</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;