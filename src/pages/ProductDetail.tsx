import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sử dụng ảnh mặc định từ Placeholder.com
const defaultImages = {
  ps1: "https://via.placeholder.com/150",
  ps2: "https://via.placeholder.com/200",
  ps3: "https://via.placeholder.com/250",
  ps4: "https://via.placeholder.com/300",
  ps5: "https://via.placeholder.com/400",
  ship: "https://via.placeholder.com/100",
  refesh: "https://via.placeholder.com/100",
  heart: "https://via.placeholder.com/50",
  visible: "https://via.placeholder.com/50",
  product1: "https://via.placeholder.com/200",
  product2: "https://via.placeholder.com/200",
  product3: "https://via.placeholder.com/200",
  product4: "https://via.placeholder.com/200",
};

const products = [
  { id: 1, name: "HAVIT HV-G92 Gamepad", price: "99.99$", image: defaultImages.product1, stock: 15, vote: "★★★★☆" },
  { id: 2, name: "AK-900 Wired Keyboard", price: "89.99$", image: defaultImages.product2, stock: 22, vote: "★★★★★" },
  { id: 3, name: "IPS LCD Gaming Monitor", price: "79.99$", image: defaultImages.product3, stock: 30, vote: "★★★★☆" },
  { id: 4, name: "RGB liquid CPU Cooler", price: "109.99$", image: defaultImages.product4, stock: 10, vote: "★★★★★" }
];

const Navbar = () => (
  <nav className="max-w-[1440px] w-full mx-auto bg-white py-4 px-6 flex justify-between items-center text-sm mt-10">
    <div className="text-2xl font-bold tracking-wider font-inter">Exclusive</div>
    <ul className="flex gap-12">
      <Link to="/"><li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">Home</li></Link>
      <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">Contact</li>
      <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">About</li>
      <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center"><Link to="/sign-up">Sign Up</Link></li>
    </ul>
    <div className="flex items-center space-x-4">
      <div className="bg-[#F5F5F5] h-[38px] w-[243px] px-3 py-2 flex items-center space-x-2">
        <input type="text" placeholder="What are you looking for?" className="bg-gray-100 outline-none text-sm w-48" />
        <svg className="w-[24px] h-[24px] cursor-pointer text-[#000000]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      </div>
      <svg className="w-5 h-5 cursor-pointer text-[#000000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>
      <svg className="w-5 h-5 cursor-pointer text-[#000000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9a2 2 0 0 0 2-1.61L23 6H6" /></svg>
    </div>
  </nav>
);

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className }: ProductImageProps) => (
  <img className={`object-cover mx-auto ${className}`} src={src} alt={alt} />
);

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="w-full mx-auto">
      <Navbar />
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>
      <div className="flex gap-20 justify-center mt-24">
        <div className="h-[600px]">
          {[defaultImages.ps1, defaultImages.ps2, defaultImages.ps3, defaultImages.ps4].map((img, index) => (
            <div key={index} className="w-[170px] h-[138px] rounded-sm bg-[#F5F5F5] my-4">
              <ProductImage src={img} alt={`ps${index + 1}`} className="w-[121px] h-[114px]" />
            </div>
          ))}
        </div>
        <div className="w-[500px] h-[600px] rounded-lg bg-[#F5F5F5]">
          <div className="mt-20">
            <ProductImage src={defaultImages.ps5} alt="ps5" className="w-[446px] h-[315px]" />
          </div>
        </div>
        <div className="h-[600px] space-y-6">
          <h1 className="text-[24px] leading-[24px] text-bold font-poppins">Havic HV G-92 Gamepad</h1>
          <div className="flex items-center gap-2">
            <div className="text-yellow-400 text-2xl rounded-[1.4px] mt-[-9px]">★★★★☆</div>
            <p className="text-black-400 text-[14px] leading-[21px] font-poppins opacity-50 my-auto">(150 Reviews)</p>
            <p className="border-1 opacity-[50%] mt-[-10px]">|</p>
            <p className="text-400 text-[#00FF66] text-[14px] leading-[21px] font-poppins opacity-60">In Stock</p>
          </div>
          <h2 className="text-[24px] leading-[24px] text-bold font-poppins">$192.00</h2>
          <p className="w-[373px] text-[14px] text-black-400 leading-[21px] font-poppins">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
          </p>
          <div className="w-[400px] h-[1px] bg-[#000000] border-[1px]"></div>
          <div className="flex items-center gap-2">
            <h3 className="text-[20px] leading-[20px] text-sm font-poppins">Colours:</h3>
            {["#A0BCE0", "#E07575"].map((color, index) => (
              <div key={index} className="w-[20px] h-[20px] bg-[${color}] rounded-full border-[#000000] border-[3px] cursor-pointer"></div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="font-poppins text-[20px] leading-[20px] text-medium text-gray-800">Size :</span>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px] ${
                  selectedSize === size ? "bg-red-500 text-white" : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 rounded-md">
              <button className="w-[40px] h-[44px] border-[2px] bg-white text-3xl items-center" onClick={decreaseQuantity}>-</button>
              <span className="w-[80px] h-[44px] border-[2px] flex items-center justify-center text-xl">{quantity}</span>
              <button className="w-[40px] h-[44px] border-[2px] bg-[#DB4444] text-white text-3xl" onClick={increaseQuantity}>+</button>
            </div>
            <button className="px-6 py-2 w-[165px] h-[44px] bg-red-500 text-white font-poppins rounded-md hover:bg-red-600 transition-colors">Buy Now</button>
            <button className="w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center border-gray-300 transition-colors hover:bg-red-500 hover:text-white" aria-label="Decrease quantity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 hover:bg-red-500 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            </button>
          </div>
          <div className="w-[399px] h-[170px] bg-[#00000080 50%] border-[2px] rounded-[4px]">
            <div className="w-[332px] h-[50px] gap-4 mx-auto flex items-center mt-[24px] ml-[16px]">
              <div className="w-[40px] h-[40px]"><img src={defaultImages.ship} alt="" /></div>
              <div className="w-[276px] h-[50px] gap-2">
                <p className="text-[16px] leading-[24px] text-black-500 font-poppins">Free Delivery</p>
                <p className="text-[12px] leading-[18px] text-black-500 font-poppins">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="w-[398px] h-[1px] border-[1px]"></div>
            <div className="w-[281px] h-[50px] gap-4 mx-auto flex items-center mt-[26px] ml-[16px]">
              <div className="w-[40px] h-[40px]"><img src={defaultImages.refesh} alt="" /></div>
              <div className="w-[225px] h-[50px] gap-2">
                <p className="text-[16px] leading-[24px] text-black-500 font-poppins">Return Delivery</p>
                <p className="text-[12px] leading-[18px] text-black-500 font-poppins">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full h-[450px] gap-[60px] mt-[150px] mx-auto">
        <div className="ml-[34px] w-[180px] h-[40px] flex">
          <div className="w-[25px] h-[40px] bg-[#DB4444] rounded-[7px] border-[1px]"></div>
          <div className="w-[180px] h-[40px]">
            <p className="text-[20px] leading-[20px] text-[#DB4444] mt-[9px] ml-[8px] text-center font-poppins">Related Item</p>
          </div>
        </div>
        <div className="max-w-[1440px] w-full h-[732px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="w-[270px] h-[322px] gap-16 mx-auto">
              <div className="w-[270px] h-[250px] border rounded-[4px] bg-[#F5F5F5] relative">
                <div className="w-[190px] h-[180px] mt-[35px] ml-[40px]">
                  <ProductImage src={product.image} alt="Product" className="w-[120px] h-[180px]" />
                </div>
                <div className="w-[34px] h-[76px] mt-[12px] gap-2 absolute top-[-5px] right-[10px] flex flex-col items-center">
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
                    <img className="w-[16px] h-[14px] object-cover cursor-pointer" src={defaultImages.heart} alt="Heart" />
                  </span>
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
                    <img className="w-[16px] h-[14px] object-cover cursor-pointer" src={defaultImages.visible} alt="Visible" />
                  </span>
                </div>
              </div>
              <div className="w-[270px] h-[56px] gap-6 items-center">
                <div className="w-[270px] h-[24px] mt-5 my-1">
                  <p className="text-[16px] font-medium leading-[24px]">{product.name}</p>
                </div>
                <div className="w-[185px] h-[24px] gap-2 items-center">
                  <p className="text-[16px] font-medium leading-[24px] text-[#DB4444]">{product.price}</p>
                  <div className="items-center">
                    <span className="text-yellow-500 text-2xl rounded-[1.4px]">{product.vote}</span>
                    <span className="text-gray-500 mx-2 items-center">({product.stock})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;