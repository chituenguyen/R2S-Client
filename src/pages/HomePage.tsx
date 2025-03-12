import React, { useState } from "react";
import * as product from "../../src/api/product"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import { CiHeart,CiStar  } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaStar } from "react-icons/fa";



const PRODUCT_PER_PAGE = 8; // Số sản phẩm hiển thị trên mỗi trang

function HomePage(){
    const { data, isPending, error } = useQuery({
        queryKey: ["product"],
        queryFn: () => product.getProductList(),
      });
    console.log("Data:", data);
    console.log("Data.data:", data.data);
    const [currentProduct, setCurrentProduct] = useState(1);
    
    // Tính toán các sản phẩm cho trang hiện tại
    const startIndex = (currentProduct - 1) * PRODUCT_PER_PAGE;
    const endIndex = startIndex + PRODUCT_PER_PAGE;
    const currentProductList = data ? data.data.slice(startIndex, endIndex) : [];
    
    console.log("currentProductList:", currentProductList);
    const totalProduct = data ? Math.ceil(data.length / PRODUCT_PER_PAGE) : 0;
    

    const Skeleton = () => (
      <div className="animate-pulse">
          {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
          ))}
      </div>
  );
    return(
      <div className="max-w-screen-xl mx-auto py-6">
      <header className="mb-10">
          <div className="flex items-center">
            <div className="bg-red-500 w-2 h-8 mr-2"></div> 
            <div className="text-red-500 font-medium text-sm">Our Products</div>
          </div>
          <div className="text-4xl font-semibold mt-2">Explore Our Products</div>
      </header>
      <div>
        <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}>
              <div className="bg-gray-100 p-4 relative">
                <div className="p-10 flex justify-center items-center">
                  <img src="https://s3-alpha-sig.figma.com/img/78e7/2711/8c99fe72271cf43f5e3566b39ca7c8f4?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rh2lM429IhG6Sx43K65-eEwSmHdPKCww6BvHju8il69EEjKLK8ANEcwzkG8Xu8KOVz-5ysEB-UQdnR7K3PKvd-7zFr-g9QKO-lsScRHmuRedQyWqKf8m2~3m0pWgkMGt~l94NSHZPsrTrkGbNYDINEUfZup-JcPjC~bzNDxLxBzjzWD~DCjKS-UpXRP9r5MgrLI4Veiz-AEErjGUBuCJO5OZVRBPY50d6lXCK9v8Vmdg-kxnrsXaxlGB1RlnSQ4Ut~afIt3ofyAj8M5DsaZfk08YteujgRrfxnaIpM8AJdjwEl35rRr8IEBeA2Mr7jL-orlEciQ2BAw4DFDli2ujTQ__" alt="Cesar Dry Dog Food" className="h-[180px] w-[115px]" />
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2"
                      style={{
                        transform: "translateX(10px)", // Dịch chuyển sang phải
                      }}
                      >
                    <CiHeart className="h-6 w-6 text-gray-600"/>
                    <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-600"/>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-lg">Breed Dry Dog Food</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold text-red-500">$100</div>
                  <div className="flex">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <CiStar/>
                    <CiStar/>
                  </div>
                  <div className="text-gray-500">(35)</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Posts Section */}
      {/* <section>
        {isPending ? (
          <Skeleton/>
        ) : (
          <div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProductList.length === 0 ? (
                <p className="text-gray-600">Không có bài viết nào.</p>
              ) : (
                currentProductList.map((data:any) => (
                  <div
                    key={data.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <img
                      src={data.image || "https://via.placeholder.com/400x200"}
                      alt={data.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex-grow">
                      <h3 className="text-xl font-semibold mb-2">
                        <div>{data.name}</div>
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(data.brand).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="text-gray-700 mt-2 text-sm line-clamp-3">
                        {data.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

           
            {totalProduct > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={() =>
                  setCurrentProduct((prev) => Math.max(prev - 1, 1))
                  }
                  className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${
                  currentProduct === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
                  }`}
                  // disabled={currentProduct === 1}
                >
                  <AiFillCaretLeft />
              </button>
            <p className="text-gray-700 text-sm translate-y-2">
                Trang <span className="font-semibold">{currentProduct}</span> /{" "}
                {totalProduct}
            </p>
            <button
              onClick={() =>
                setCurrentProduct((prev) => Math.min(prev + 1, totalProduct))
                }
              className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${
                currentProduct === totalProduct
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-200"
                }`}
      // disabled={currentProduct === totalProduct}
              >
                <AiFillCaretRight />
            </button>
          </div>
        )}
          </div>
        )}
      </section> */}
    </div>
  );
}

export default HomePage
