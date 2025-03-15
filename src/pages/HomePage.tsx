import SwiperComponent from "../components/SwiperComponent"
import l from "../../assets/left.png"
import r from "../../assets/right.png"
import heart from "../../assets/heart.png"
import visible from "../../assets/visible.png"
import product1 from "../../assets/product1.jpg"
import { useProducts } from "../redux/slices/productSlice"
import { Link } from "react-router-dom"

function HomePage() {
  const { data, isLoading, error } = useProducts()
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
  // Sắp xếp dữ liệu theo thứ tự id tăng dần
  const sortedData = data.data.sort((a, b) => a.id - b.id)

  return (
    <div className="mt-10">
      {/* Navbar */}
      <nav className="max-w-[1440px] w-full mx-auto bg-white py-4 px-6 flex justify-between items-center text-sm">
        <div className="text-2xl font-bold tracking-wider font-inter">
          Exclusive
        </div>
        <ul className="flex gap-12">
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            Home
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            Contact
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            About
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="bg-[#F5F5F5] h-[38px] w-[243px] px-3 py-2 flex items-center space-x-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 outline-none text-sm w-48"
            />
            <svg
              className="w-[24px] h-[24px] cursor-pointer text-[#000000]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* Icons */}
          <svg
            className="w-5 h-5 cursor-pointer text-[#000000]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <svg
            className="w-5 h-5 cursor-pointer text-[#000000]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
      </nav>

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
            <div className="w-[270px] h-[322px] gap-16 mx-auto">
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
                <div className="w-[34px] h-[76px] mt-[12px] gap-2 absolute top-[-5px] right-[10px] flex flex-col items-center">
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
        <div className="w-[249px] h-[161px] gap-6">
          <div className="w-[80px] h-[80px] opacity-[30%] bg-[#2F2E30] rounded-full flex mx-auto items-center justify-center">
            <div className="w-[58px] h-[58px] bg-[#000000] rounded-full">
              <svg
                className="text-[#FAFAFA] mx-auto mt-[16px]"
                width="35"
                height="22"
                viewBox="0 0 35 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 21H5.16667C4.0621 21 3.16667 20.1046 3.16667 19V14.3333M1.5 1H17.8333C18.9379 1 19.8333 1.89543 19.8333 3V21M13.5 21H23.1667M30.5 21H31.1667C32.2712 21 33.1667 20.1046 33.1667 19V11M33.1667 11H19.8333M33.1667 11L28.7493 3.63768C28.3878 3.03526 27.7368 2.66667 27.0343 2.66667H19.8333"
                  stroke="#FAFAFA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-[249px] h-[57px] gap-8 cursor-pointer my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              FREE AND FAST DELIVERY
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-1">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>

        <div className="w-[249px] h-[161px] gap-6">
          <div className="w-[80px] h-[80px] opacity-[30%] bg-[#2F2E30] rounded-full flex mx-auto items-center justify-center">
            <div className="w-[58px] h-[58px] bg-[#000000] rounded-full">
              <svg
                className="text-[#FAFAFA] mx-auto mt-[12px]"
                width="30"
                height="21"
                viewBox="0 0 30 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66669 20V15C1.66669 11.4637 3.07145 8.07235 5.57193 5.57187C8.07241 3.07138 11.4638 1.66663 15 1.66663C18.5362 1.66663 21.9276 3.07138 24.4281 5.57187C26.9286 8.07235 28.3334 11.4637 28.3334 15V20"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-[249px] h-[57px] gap-8 cursor-pointer my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              24/7 CUSTOMER SERVICE
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-5">
              Friendly 24/7 customer support
            </p>
          </div>
        </div>

        <div className="w-[249px] h-[161px] gap-6">
          <div className="w-[80px] h-[80px] opacity-[30%] bg-[#2F2E30] rounded-full flex mx-auto items-center justify-center">
            <div className="w-[58px] h-[58px] bg-[#000000] rounded-full">
              <svg
                className="text-[#FAFAFA] mx-auto mt-[12px]"
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.09912 28.5994L4.09889 28.5992C3.22616 27.9485 2.42555 26.9207 1.84276 25.7591C1.25992 24.5974 0.916687 23.3452 0.916687 22.2667V9.86669C0.916687 7.50748 2.67152 4.96189 4.89119 4.13525L4.89215 4.13489L13.2084 1.01838C13.2085 1.01835 13.2086 1.01832 13.2086 1.01829C13.9621 0.736733 14.9616 0.587524 15.9834 0.587524C17.0051 0.587524 18.0046 0.736733 18.7581 1.01829C18.7581 1.01832 18.7582 1.01835 18.7583 1.01838L27.0746 4.1349L27.0755 4.13525C29.2952 4.96189 31.05 7.50748 31.05 9.86669V22.25C31.05 23.3372 30.7066 24.5893 30.1241 25.7484C29.5416 26.9074 28.7411 27.9314 27.8678 28.5825L27.8676 28.5827L20.7009 33.9327L20.7009 33.9326L20.6947 33.9374C19.412 34.9265 17.724 35.4334 16 35.4334C14.2774 35.4334 12.5852 34.9271 11.2649 33.9487C11.2647 33.9486 11.2646 33.9484 11.2644 33.9483L4.09912 28.5994ZM13.7419 2.43157L13.7412 2.43182L5.42456 5.54849L5.42386 5.54875C4.59627 5.86031 3.85504 6.5226 3.32412 7.29073C2.79303 8.05913 2.43335 8.98988 2.43335 9.88336V22.2667C2.43335 23.1612 2.74394 24.1893 3.20094 25.1011C3.65782 26.0127 4.29331 26.8723 5.00087 27.4007L5.00092 27.4007L12.1672 32.7504C13.2292 33.5446 14.6283 33.925 16.0021 33.925C17.3761 33.925 18.7783 33.5446 19.8478 32.7517L19.8491 32.7507L27.0158 27.4007L27.0167 27.4C27.7314 26.864 28.3669 26.0051 28.8222 25.0945C29.2776 24.1838 29.5834 23.1601 29.5834 22.2667V9.86669C29.5834 8.98052 29.2229 8.05387 28.6926 7.28657C28.1621 6.51902 27.4223 5.85409 26.5976 5.53392L26.5977 5.53389L26.5921 5.53182L18.2755 2.41515L18.2755 2.41507L18.2664 2.41186C17.6283 2.18663 16.8002 2.08326 16.0007 2.08544C15.2021 2.08762 14.3752 2.19526 13.7419 2.43157Z"
                  fill="#FAFAFA"
                  stroke="#FAFAFA"
                />
              </svg>
            </div>
          </div>
          <div className="w-[255px] h-[57px] gap-8 cursor-pointer my-5">
            <h1 className="text-[20px] leading-[28px] text-black font-bold my-1">
              MONEY BACK GUARANTEE
            </h1>
            <p className="h-[21px] text-[14px] leading-[21px] text-white-400 font-sm ml-6">
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </div>

      <div className=" max-w-[1400px] h-[1px] bg-gray-300 mt-6 mx-auto"></div>
    </div>
  )
}

export default HomePage
