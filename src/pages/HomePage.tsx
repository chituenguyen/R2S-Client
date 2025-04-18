import SwiperComponent from "../components/SwiperComponent"
import l from "../../assets/left.png"
import r from "../../assets/right.png"
import heart from "../../assets/heart.png"
import visible from "../../assets/visible.png"
import product1 from "../../assets/product1.jpg"
import ship1 from "../../assets/ship-1.jpg"
import ship2 from "../../assets/ship-2.jpg"
import ship3 from "../../assets/ship-3.jpg"
import { useProducts } from "../redux/slices/productSlice"
import { Link} from "react-router-dom"
import Navbarpage from "./Navbarpage"
import ChatPage from "./ChatPage"

interface Product {
  id: number;
  name: string;
  price: number;
  images?: string[];
  stock: number;
 
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}


function HomePage() {

  const { data, isLoading, error } = useProducts()

  const handleAddToCart = (product: Product) => {
    // Tạo dữ liệu đúng format cho OrderItem
    const orderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
      image: product.images?.[0]
    };
    
    // Lấy danh sách orders hiện tại từ localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = existingOrders.findIndex((item: OrderItem) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng và cập nhật totalPrice
      existingOrders[existingItemIndex].quantity += 1;
      existingOrders[existingItemIndex].totalPrice = 
        existingOrders[existingItemIndex].price * existingOrders[existingItemIndex].quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
      existingOrders.push(orderItem);
    }
    
    // Lưu danh sách orders đã cập nhật vào localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // // Thông báo cho người dùng (có thể sử dụng một thông báo không chặn luồng)
    // // Optional: Show a confirmation message
    // alert(`${product.name} added to cart!`);
    
    // // // Chuyển hướng đến trang cart
    // // navigate('/cart');
  };
  if (isLoading)
    return <div className="text-center py-10">Loading products...</div>
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {error.message}
      </div>
    )
  if (!data?.data?.length) {
    return <div className="text-center py-10">No products available</div>
  }
  
  // // Sắp xếp dữ liệu theo thứ tự id tăng dần
  // const sortedData = data.data.sort((a, b) => a.id - b.id)
  // Sắp xếp dữ liệu theo thứ tự id tăng dần và chỉ lấy 8 sản phẩm đầu tiên
  const sortedData = data.data.sort((a, b) => a.id - b.id).slice(0, 8);
  return (
    <div className="mt-10">
      <Navbarpage />
      <ChatPage />

      {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>

      {/* Swiper Section */}
      <div className="mt-20">
        <SwiperComponent />
      </div>

      <div className="max-w-[1440px] w-full h-[998px] mx-auto mt-20">
        <div className="flex justify-between">
          <div>
            <div className="w-[142px] h-[40px] flex items-center gap-4">
              <div className="w-[20px] h-[40px] border bg-[#DB4444]"></div>
              <div className="w-[106px] h-[20px]">
                <span className="font-semibold text-[16px] leading-[20px] tracking-[0] font-poppins text-[#DB4444]">
                  Our Products
                </span>
              </div>
            </div>
            <h1 className="w-[398px] h-[48px] font-semibold text-[36px] leading-[48px] tracking-[4%] font-inter">
              Explore Our Products
            </h1>
          </div>
          <div className="flex gap-4 mt-5">
            <div className="w-[46px] h-[46px] border rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <img className="w-[24px] h-[24px] cursor-pointer" src={l} />
            </div>
            <div className="w-[46px] h-[46px] border rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <img className="w-[24px] h-[24px] cursor-pointer" src={r} />
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-[1440px] w-full h-[732px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedData.map((product) => (
            <div
              key={product.id}
              className="w-[270px] h-[322px] gap-16 mx-auto"
            >
              <div className="w-[270px] h-[250px] border rounded-[4px] bg-[#F5F5F5] relative">
                <div className="w-[190px] h-[180px] mt-[35px] ml-[40px]">
                  <Link to={`/product/${product.id}`}>
                    <img
                      className="w-[115px] h-[180px] ml-[38px] cursor-pointer"
                      src={product.images?.[0] || product1}
                      alt=""
                    />
                  </Link>
                </div>
                {/* Add Like and View icons */}
                <div className="w-[34px] h-[130px] mt-[12px] gap-2 absolute top-[-5px] right-[10px] flex flex-col items-center">
                  {/* Heart Icon */}
                  <span className="w-[34px] h-[34px] flex items-center justify-center  rounded-full bg-[#FFFFFF] ">
                    <img
                      className="w-[16px] h-[14px] object-cover cursor-pointer"
                      src={heart}
                      alt="Heart"
                    />
                  </span>
                  {/* Eye Icon */}
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
                    <img
                      className="w-[16px] h-[14px] object-cover cursor-pointer"
                      src={visible}
                      alt="Visible"
                    />
                  </span>
                  {/* Eye Icon */}
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
                    <svg
                      className="w-4 h-4 cursor-pointer text-[#000000]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="w-[270px] h-[56px] gap-6 items-center">
                <div className="w-[270px] h-[24px] mt-5">
                  <p className="text-[16px] font-medium leading-[24px]">
                    {product.name}
                  </p>
                </div>
                <div className="w-[185px] h-[24px] gap-2 flex items-center">
                  <p className="text-[16px] font-medium leading-[24px] text-[#DB4444]">
                    {product.price}$
                  </p>
                  <div className=" items-center mx-2">
                    <span className="text-yellow-400 text-lg  rounded-[1.4px]">
                      ★★★☆☆
                    </span>
                    <span className="text-gray-500 mx-2 items-center ">
                      ({product.stock})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" max-w-[1400px] h-[1px] bg-gray-300 mt-6 mx-auto"></div>
        <div className="w-[234px] h-[56px] border rounded-[4px] bg-[#DB4444] mx-auto items-center justify-center flex mt-5">
          <p className="text-[24px] leading-[24px] text-white cursor-pointer">
            View All Products
          </p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-[943px] mx-auto mt-[80px] grid grid-cols-3 gap-[88px]">
        <div className="w-[249px] h-[161px] gap-6 cursor-pointer">
          <img className="mx-auto" src={ship1} alt="" />
          <div className="w-[249px] h-[57px] gap-8 my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              FREE AND FAST DELIVERY
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-1">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>

        <div className="w-[249px] h-[161px] gap-6 cursor-pointer">
          <img className="mx-auto" src={ship2} alt="" />
          <div className="w-[249px] h-[57px] gap-8 my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              24/7 CUSTOMER SERVICE
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-5">
              Friendly 24/7 customer support
            </p>
          </div>
        </div>

        <div className="w-[249px] h-[161px] gap-6 cursor-pointer">
          <img className="mx-auto" src={ship3} alt="" />
          <div className="w-[255px] h-[57px] gap-8 my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              MONEY BACK GUARANTEE
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-6">
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </div>

      <div className=" max-w-[1400px] h-[1px] bg-gray-300 mt-12 mx-auto"></div>
    </div>
  )
}

export default HomePage
