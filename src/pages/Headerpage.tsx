import qr from "../../assets/qr.jpg"
import chplay from "../../assets/chplay.jpg"
import appstore from "../../assets/appstore.jpg"

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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
            <div className="w-[168px] h-[24px] gap-[24px] flex items-center justify-between mx-auto mt-4">
              <svg
                className="w-[11px] h-[18px] text-white"
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7H10.5L10 9H6V18H4V9H0V7H4V5.128C4 3.345 4.186 2.698 4.534 2.046C4.87501 1.40181 5.40181 0.875009 6.046 0.534C6.698 0.186 7.345 0 9.128 0C9.65 0 10.108 0.0500001 10.5 0.15V2H9.128C7.804 2 7.401 2.078 6.99 2.298C6.686 2.46 6.46 2.686 6.298 2.99C6.078 3.401 6 3.804 6 5.128V7Z"
                  fill="white"
                />
              </svg>
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.905 4.84651L10.905 4.84646C10.9194 4.06035 11.2418 3.3113 11.8028 2.76049C12.3639 2.20969 13.1188 1.90116 13.905 1.90129L10.905 4.84651ZM10.905 4.84651L10.877 6.42135M10.905 4.84651L10.877 6.42135M2.75811 3.80857L2.89001 3.91846C4.76679 5.48211 6.71781 6.41823 8.74946 6.6952C8.74947 6.6952 8.74949 6.6952 8.74951 6.6952L10.3104 6.90718L2.75811 3.80857ZM2.75811 3.80857L2.72759 3.97751M2.75811 3.80857L2.72759 3.97751M2.72759 3.97751C2.42576 5.64819 2.5683 7.07086 3.1479 8.30176C3.72718 9.53198 4.73827 10.5605 6.15577 11.4519L6.15579 11.452M2.72759 3.97751L6.15579 11.452M6.15579 11.452L7.90279 12.55L7.954 12.4685M6.15579 11.452L7.954 12.4685M7.954 12.4685L7.90279 12.55C7.97196 12.5934 8.02943 12.6532 8.07016 12.724C8.1109 12.7948 8.13366 12.8745 8.13645 12.9562C8.13925 13.0378 8.122 13.1189 8.0862 13.1924C8.05041 13.2658 7.99716 13.3294 7.93112 13.3775L7.93101 13.3775M7.954 12.4685L7.93101 13.3775M7.93101 13.3775L6.33901 14.5405L6.11542 14.7039M7.93101 13.3775L6.11542 14.7039M6.11542 14.7039L6.39178 14.7211M6.11542 14.7039L6.39178 14.7211M6.39178 14.7211C7.3449 14.7805 8.25288 14.7385 9.00946 14.5884L9.00958 14.5884M6.39178 14.7211L9.00958 14.5884M9.00958 14.5884C11.3886 14.1134 13.3745 12.9794 14.7652 11.2211M9.00958 14.5884L14.7652 11.2211M10.877 6.42135C10.8757 6.49182 10.8594 6.5612 10.8293 6.62495C10.7993 6.6887 10.7561 6.74537 10.7026 6.79125C10.649 6.83712 10.5864 6.87117 10.5188 6.89115C10.4513 6.91112 10.3803 6.91659 10.3105 6.9072L10.877 6.42135ZM14.7652 11.2211C16.1557 9.46296 16.945 7.08835 16.945 4.14229M14.7652 11.2211L16.945 4.14229M16.945 4.14229C16.945 3.99668 16.8714 3.78474 16.744 3.55722M16.945 4.14229L16.744 3.55722M16.744 3.55722C16.6142 3.32559 16.4215 3.06508 16.1673 2.82049M16.744 3.55722L16.1673 2.82049M16.1673 2.82049C15.6587 2.33088 14.8999 1.90129 13.905 1.90129L16.1673 2.82049ZM18.4978 1.53842C18.8818 1.48388 19.3285 1.34345 19.916 1.01105C19.6101 2.49526 19.4321 3.16764 18.7642 4.08336L18.745 4.10969V4.14229C18.745 7.94153 17.578 10.7567 15.8258 12.7397C14.0726 14.7238 11.7277 15.8813 9.36243 16.3532C7.74529 16.6759 5.7544 16.5728 3.99643 16.2106C3.11813 16.0296 2.30077 15.7846 1.61983 15.4974C1.03727 15.2517 0.560091 14.9775 0.229559 14.6904C0.660648 14.6482 1.4114 14.5535 2.24366 14.3598C3.24355 14.1272 4.37173 13.7494 5.20306 13.141L5.31918 13.056L5.19904 12.9768C5.15724 12.9492 5.11178 12.9196 5.06301 12.8879C4.30477 12.3938 2.74648 11.3786 1.73155 9.51655C0.667136 7.56374 0.192566 4.66295 1.91362 0.425918C3.57889 2.34347 5.2726 3.66001 6.99504 4.3668L6.99505 4.36681C7.57662 4.60536 7.94255 4.72373 8.23185 4.79141C8.45087 4.84265 8.62608 4.86463 8.81173 4.88794C8.87034 4.89529 8.92998 4.90278 8.99238 4.91135L9.28722 4.95189L9.10594 4.77077C9.13096 3.8414 9.42538 2.93895 9.95386 2.17331C10.4904 1.39606 11.2442 0.79434 12.1211 0.443497C12.9979 0.0926537 13.9588 0.00827681 14.8833 0.200931C15.8079 0.393585 16.6551 0.854708 17.3189 1.52657L17.3485 1.55658L17.3907 1.55628C17.4934 1.55556 17.5972 1.55908 17.7036 1.56269C17.9483 1.57098 18.2068 1.57974 18.4978 1.53842Z"
                  fill="white"
                  stroke="black"
                  stroke-width="0.2"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V15C1 16.0609 1.42143 17.0783 2.17157 17.8284C2.92172 18.5786 3.93913 19 5 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V5C19 3.93913 18.5786 2.92172 17.8284 2.17157C17.0783 1.42143 16.0609 1 15 1Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 6.05C9.417 5.113 10.611 4.5 12 4.5C13.4587 4.5 14.8576 5.07946 15.8891 6.11091C16.9205 7.14236 17.5 8.54131 17.5 10V17.5H15.5V10C15.5 9.07174 15.1313 8.1815 14.4749 7.52513C13.8185 6.86875 12.9283 6.5 12 6.5C11.0717 6.5 10.1815 6.86875 9.52513 7.52513C8.86875 8.1815 8.5 9.07174 8.5 10V17.5H6.5V5H8.5V6.05ZM1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0C1.89782 0 2.27936 0.158035 2.56066 0.43934C2.84196 0.720644 3 1.10218 3 1.5C3 1.89782 2.84196 2.27936 2.56066 2.56066C2.27936 2.84196 1.89782 3 1.5 3ZM0.5 5H2.5V17.5H0.5V5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

