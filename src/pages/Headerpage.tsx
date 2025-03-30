import qr from "../../assets/qr.jpg"
import chplay from "../../assets/chplay.jpg"
import appstore from "../../assets/appstore.jpg"
import footer1 from "../../assets/footer-1.jpg"
import footer2 from "../../assets/footer-2.jpg"
import footer3 from "../../assets/footer3.jpg"
import footer4 from "../../assets/footer4.jpg"

export function Header() {
  return (
    <header className="bg-[#000000] w-full">
      <div className="max-w-[1440px] w-full mx-auto text-white py-2 px-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3">
          <p className="font-poppins">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <p className="font-bold underline cursor-pointer ml-auto">ShopNow</p>
        </div>
        <div className="flex items-center space-x-1">
          <p className="font-poppins">English</p>
          <span>
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 15.5l-6-6 1.4-1.4L12 12.7l4.6-4.6 1.4 1.4-6 6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </header>
  )
}
export function Footer() {
  return (
    <footer className="w-full h-[440px] bg-[#000000] mt-[100px] flex justify-between">
      <div className="w-[1170px] h-[236px] mt-20 ml-[150px] gap-[345px] mx-auto grid grid-cols-5">
        <div className="w-[217px] h-[188px] gap-[16px]">
          <h1 className="font-poppins text-[20px] font-bold leading-[28px] text-[#FAFAFA] my-4 cursor-pointer">
            Exclusive
          </h1>
          <h3 className="font-poppins text-[16px] font-bold leading-[24px] text-[#FAFAFA] my-4 cursor-pointer">
            Subscribe
          </h3>
          <p className="font-poppins text-[16px] leading-[16px] text-[#FAFAFA] text-opacity-80 cursor-pointer">
            Get 10% off your first order
          </p>
          <div className=" w-[217px] h-[48px] bg-[#000000] border-2 border-white rounded-md flex items-center justify-between my-4 ">
            <p className="text-[16px] text-white font-poppins leading-[24px] w-[130px] h-[24px] rounded-md bg-[#000000] text-opacity-40 mx-2">
              Enter your email
            </p>
            <svg
              className="w-[20px] h-[18px] mx-2 text-white"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.91199 10H2.99999L1.02299 2.13505C1.01033 2.08934 1.00262 2.0424 0.999989 1.99505C0.977989 1.27405 1.77199 0.774048 2.45999 1.10405L21 10L2.45999 18.896C1.77999 19.223 0.995989 18.737 0.999989 18.029C1.00201 17.9658 1.01313 17.9031 1.03299 17.843L2.49999 13"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="w-[175px] h-[180px] gap-[24px]">
          <h3 className="font-poppins text-[16px] font-bold leading-[24px] text-[#FAFAFA] my-4 cursor-pointer">
            Support
          </h3>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-4 cursor-pointer">
            111 Bijoy sarani, Dhaka,
            <br /> DH 1515, Bangladesh.
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-4 cursor-pointer">
            exclusive@gmail.com
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-4 cursor-pointer">
            +8801921562962
          </p>
        </div>
        <div className="w-[126px] h-[236px] gap-[24px]">
          <h3 className="font-poppins text-[16px] font-bold leading-[24px] text-[#FAFAFA] my-4 items-center">
            Account
          </h3>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            My Account
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Login / Register
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Cart
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Wishlist
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Shop
          </p>
        </div>
        <div className="w-[175px] h-[180px] gap-[24px]">
          <h3 className="font-poppins text-[16px] font-bold leading-[24px] text-[#FAFAFA] my-4 items-center">
            Quick Link
          </h3>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Privacy Policy
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Terms Of Use
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            FAQ
          </p>
          <p className="font-poppins text-[16px] leading-[24px] text-[#FAFAFA] my-2 cursor-pointer">
            Contact
          </p>
        </div>
        <div className="w-[198px] h-[162px] gap-[24px]">
          <h3 className="font-poppins text-[16px] font-bold leading-[24px] text-[#FAFAFA] my-4 items-center">
            Download App
          </h3>
          <div className="w-[198px] h-[110px] gap-[8px]">
            <p className="font-poppins text-[12px] leading-[18px] text-[#FAFAFA] my-2 cursor-pointer text-opacity-[70%]">
              Save $3 with App New User Only
            </p>
            <div className="w-[198px] h-[84px] flex items-center justify-between ">
              <div className="w-[198px] h-[84px] ">
                <img
                  className="w-[76px] h-[76px] mt-[2px] ml-[2px] border-2 border-white rounded-md"
                  src={qr}
                  alt=""
                />
              </div>
              <div className="w-[198px] h-[84px] gap-[8px]">
                <img
                  className="w-[140px] h-[30px] mt-[2px] ml-[2px] border-2 border-white rounded-md my-2"
                  src={chplay}
                  alt=""
                />
                <img
                  className="w-[140px] h-[30px] mt-[2px] ml-[2px] border-2 border-white rounded-md"
                  src={appstore}
                  alt=""
                />
              </div>
            </div>
            <div className="w-[168px] h-[24px] gap-[24px] flex items-center justify-between o mt-4">
              <img src={footer4} alt="" />
              <img src={footer1} alt="" />
              <img src={footer2} alt="" />
              <img src={footer3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

