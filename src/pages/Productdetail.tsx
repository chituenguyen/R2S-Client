import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as product from "../api/product";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRetweet } from "react-icons/fa6";
import Rating from "../effect/star";
import ProductList from "../components/List/ProductList"
import { useEffect } from "react";
import { Product } from "../redux/type";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import { useToast } from 'd:/New folder/R2S-Client/src/components/context/ToastContext';


let PRODUCT_PER_PAGE = 4; //Số sản phẩm hiển thị

function ProductDetail() {
    const { slug } = useParams();
    const { toast } = useToast();
    // console.log("slug:", slug);
    const { data, isPending, error,isSuccess } = useQuery({
    queryKey: ["postDetail", slug],
    queryFn: () => product.getProductDetail(slug as unknown as number),
    enabled: !!slug,
    }  );

    // console.log("id:", slug as unknown as number);
    // console.log("detaildata:", data);
    // console.log("isPending:", isPending);
    // console.log("error:", error);

    const [selectedColor, setSelectedColor] = useState('red'); // Màu mặc định là blue
    const colors = ['red', 'black', 'blue', 'green']; // Added more colors for demonstration
    const handleClick = (color: string) => {
        setSelectedColor(color);
    };
    
    const [productbuy, setProductBuy] = useState<Product | null>(null);
    useEffect(() => {
        if (data?.data?.length > 0) {
            setProductBuy(data.data[0]);
        }
    }, [data]);

    const [count, setCount] = useState(1); // Khởi tạo biến count với giá trị 1

    const handleDecrement = () => {
    setCount((count) => (count > 1 ? count - 1 : 1)); // Giảm count, không cho count nhỏ hơn 1
     };

    const handleIncrement = () => {
    setCount((count) => count + 1); // Tăng count
    };
    // console.log("productbuy", productbuy);
    // localStorage.removeItem("cart");
    const handleBuyNow = () => {
        try {
            if (productbuy) {
                const cartItem = {
                    id: productbuy.id,
                    name: productbuy.name,
                    img: productbuy?.images && productbuy.images[1] ? productbuy.images[1] : null,
                    price: productbuy.price,
                    quantity: count,
                };
    
                const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
                const existingItemIndex = existingCart.findIndex((item: { id: number }) => item.id === cartItem.id);
    
                if (existingItemIndex !== -1) {
                    // Sản phẩm đã tồn tại, gộp số lượng
                    existingCart[existingItemIndex].quantity += cartItem.quantity;
                } else {
                    // Sản phẩm chưa tồn tại, thêm sản phẩm mới
                    existingCart.push(cartItem);
                }
    
                localStorage.setItem("cart", JSON.stringify(existingCart));
                toast("Sản phẩm được thêm vào giỏ hàng thành công!");
            } else {
                console.log("Sản phẩm chưa sẵn sàng.");
            }
        } catch (error) {
            console.error("Lỗi trong handleBuyNow:", error);
            toast("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
        }
    };
    
    if (!data){
        return <></>
    }

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }
    

    return (
        isPending ? (
            <ProductSkeleton />
          ) : (
        <div className="container px-6">
            <div className="flex items-center text-sm text-gray-400 my-[50px] p-4">
                <span className="mr-1">Account</span>
                <span className="mr-1">/</span>
                <span className="mr-1">Gaming</span>
                <span className="mr-1">/</span>
                <span className="text-gray-700">{productbuy?.name || "Product Name Not Available"}</span>
            </div>
            <div className="flex">
                {/* Cột bên trái (hình ảnh thu nhỏ) */}
                <div className="w-1/6 p-4">
                    <div className="mb-2 border w-[170px] h-[138px] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-100 ">
                        {productbuy && (
                            <img src={productbuy.images[0]} alt={productbuy.name} className="w-[170px] h-[138px]" />
                        )}
                    </div>
                    <div className="mb-2 border w-[170px] h-[138px] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-100 ">
                        <img src={productbuy?.images[0]} alt="Thumbnail 2" className="w-full" />
                    </div>
                    <div className="mb-2 border w-[170px] h-[138px] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-100 ">
                        <img src={productbuy?.images[0]} alt="Thumbnail 2" className="w-full" />
                    </div>
                </div>

                {/* Cột bên phải (hình ảnh lớn và thông tin sản phẩm) */}
                <div className="w-3/6 p-4">
                    <div className="flex justify-center mb-4 w-[500px] h-[600px] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-100">
                        <img src={productbuy?.images[0]} alt="Main Product" className="w-[500px] h-[600px]" />
                    </div>
                </div>
                <div className="w-3/6 p-4 mr-[50px]">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">{productbuy?.name || "Product Name Not Available"}</h2>
                        <div className="text-sm text-gray-500 grid grid-flow-col gap-1  ">
                            <Rating rate={productbuy?.rate || 0}/>
                            <span className="text-gray-500">({productbuy?.stock || 0} Reviews)</span> | <span className="text-green-500">In Stock</span>
                        </div>
                        <div className="text-3xl font-bold my-4">${productbuy?.price || 0}</div>
                        <p className="text-sm">
                            {productbuy?.description || "No description available."}
                        </p>
                        <div className="border-t-2 border-gray-300 w-full mt-4"></div>
                    </div>

                    {/* Lựa chọn màu sắc và kích thước */}
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <span className="mr-2">Colours:</span>
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    className={`relative w-6 h-6 rounded-full cursor-pointer`}
                                    onClick={() => handleClick(color)}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-full border-2 ${
                                            selectedColor === color ? 'border-black' : 'border-white'
                                        }`}
                                    ></div>
                                    <div
                                        className={`absolute inset-1 rounded-full`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Size:</span>
                            <button className="border border-gray-300 rounded-md px-2 py-1 mr-1 ">XS</button>
                            <button className="border border-gray-300 rounded-md px-2 py-1 mr-1">S</button>
                            {/* ... thêm các nút kích thước khác */}
                        </div>
                    </div>

                    {/* Nút "Buy Now" và biểu tượng yêu thích */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <button className="hover:bg-red-600 border border-gray-300 rounded-l-md px-3 py-2"
                            onClick={handleDecrement}>-</button>
                            <div className="border border-gray-300 px-4 py-2">{count}</div>
                            <button className="hover:bg-red-600 border border-gray-300 rounded-r-md px-3 py-2" 
                            onClick={handleIncrement}>+</button>
                            <button className="ml-4 bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 mr-2"
                                onClick={handleBuyNow}
                            >Buy Now</button>
                            <div className="border border-gray-300 rounded-md p-2">
                                <CiHeart />
                            </div>
                        </div>
                    </div>

                    {/* Thông tin giao hàng */}
                    <div className="border border-gray-300 rounded-md p-4 ">
                        <div className="grid grid-flow-col grid-rows-1 gap-4 ">
                            <TbTruckDelivery className="h-[40px] w-[40px] row-span-2 justify-self-center self-center" />
                            <span>Free Delivery
                                <div className="text-sm text-gray-500 underline">
                                    Enter your postal code for Delivery Availability
                                </div>
                            </span>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                        <div className="grid grid-flow-col grid-rows-1 gap-4 ">
                            <FaRetweet className="h-[40px] w-[40px] row-span-2 justify-self-center self-center" />
                            <span>Return Delivery</span>
                            <div className="text-sm text-gray-500">
                                Free 30 Days Delivery Returns. <span className="text-blue-500">Details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-[100px] ">
            <div className="flex items-center mb-10">
                    <div className="bg-red-500 w-2 h-8 mr-2"></div>
                    <div className="text-red-500 font-medium text-sm">Related Item</div>
            </div>
            <ProductList PRODUCT_PER_PAGE={PRODUCT_PER_PAGE} />
            </div>
        </div>
        ))
}
export default ProductDetail;
