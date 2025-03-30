import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ship1 from "../../assets/product1.jpg";
import Navbarpage from "./Navbarpage";
import pay1 from "../../assets/pay1.jpg";
import pay2 from "../../assets/pay2.jpg";
import pay3 from "../../assets/pay3.jpg";
import pay4 from "../../assets/pay4.jpg";

// Khai báo kiểu cho OrderItem
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

function CheckoutPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được render
  useEffect(() => {
    const storedOrders: OrderItem[] = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Tính lại totalPrice cho mỗi sản phẩm để đảm bảo chính xác
    const updatedOrders = storedOrders.map(item => ({
      ...item,
      totalPrice: item.price * item.quantity
    }));
    
    setOrders(updatedOrders);
    
    // Tính tổng giá trị giỏ hàng
    const calculatedTotal = updatedOrders.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(calculatedTotal);
  }, []);

  // // Xử lý áp dụng mã giảm giá
  // const applyCoupon = () => {
  //   // Đây chỉ là ví dụ logic giảm giá, bạn có thể thay đổi theo nhu cầu thực tế
  //   if (couponCode === "DISCOUNT10") {
  //     const discountAmount = totalPrice * 0.1; // Giảm 10%
  //     setDiscount(discountAmount);
  //   } else if (couponCode === "DISCOUNT20") {
  //     const discountAmount = totalPrice * 0.2; // Giảm 20%
  //     setDiscount(discountAmount);
  //   } else {
  //     alert("Invalid coupon code");
  //     setDiscount(0);
  //   }
  // };

  // Xử lý khi submit form thanh toán
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const customerInfo = {
      firstName: formData.get("first-name"),
      companyName: formData.get("company-name"),
      streetAddress: formData.get("street-address"),
      apartment: formData.get("apartment"),
      townCity: formData.get("town-city"),
      phoneNumber: formData.get("phone-number"),
      email: formData.get("email-address"),
      saveInfo: formData.get("save-info"),
      paymentMethod: formData.get("payment"),
      orderTotal: totalPrice - discount,
      discount: discount,
      items: orders
    };

    // Lưu thông tin khách hàng vào localStorage (hoặc backend nếu cần)
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    // Bạn có thể gửi đơn hàng đến backend tại đây (nếu cần)
    alert("Order placed successfully!");
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = () => {
    // Kiểm tra xem đã nhập đủ thông tin chưa
    const customerInfo = localStorage.getItem("customerInfo");
    if (!customerInfo) {
      alert("Please fill in your billing details before placing the order");
      return;
    }

    // Có thể thêm logic đặt hàng ở đây
    alert("Order placed successfully!");
    
    // Xóa giỏ hàng sau khi đặt hàng thành công
    localStorage.removeItem("orders");
    setOrders([]);
    setTotalPrice(0);
  };
  return (
    <div className="w-full mx-auto mt-10">
      <Link to="/home">
        <Navbarpage />
      </Link>
      {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>

      <div className="max-w-full mx-auto p-6 bg-white flex justify-between mt-20">
        <div className="w-[470px] h-[814px]">
          <h2 className="text-[36px] leading-[30px] font-poppins mb-10">
            Billing Details
          </h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Enter your first name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Company Name */}
            <div className="mb-6">
              <label
                htmlFor="company-name"
                className="block text-sm font-semibold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company-name"
                id="company-name"
                placeholder="Enter your company name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Street Address */}
            <div className="mb-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-semibold mb-2"
              >
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                placeholder="Enter your street address"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Apartment, floor, etc. */}
            <div className="mb-6">
              <label
                htmlFor="apartment"
                className="block text-sm font-semibold mb-2"
              >
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                id="apartment"
                placeholder="Apartment, floor, etc."
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Town/City */}
            <div className="mb-6">
              <label
                htmlFor="town-city"
                className="block text-sm font-semibold mb-2"
              >
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="town-city"
                id="town-city"
                placeholder="Enter your town/city"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Save Information Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="save-info"
                id="save-info"
                className="w-4 h-4 mr-2 border-gray-300 rounded"
              />
              <label htmlFor="save-info" className="text-sm text-gray-700">
                Save this information for faster check-out next time
              </label>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="w-[525px] h-[600px] mt-10">
          <div className="max-w-4xl mx-auto p-6 bg-white ">
            {/* Cart Items */}
            <div className="mb-6">
              {orders.map((item: OrderItem) => (
                <div key={item.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center">
                    <img
                      src={item.image || ship1}
                      alt={item.name}
                      className="w-9 h-9 object-cover mr-4"
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.totalPrice}$</span>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="bg-white rounded-lg  border-gray-300">
              <h3 className="text-xl font-semibold mb-4">Cart Total</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{totalPrice}$</span>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex justify-between mb-4 font-semibold">
                  <span>Total:</span>
                  <span>{totalPrice}$</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="flex justify-between items-center">
                <div className="items-center mb-4">
                  <input type="radio" id="bank" name="payment" className="mr-2" />
                  <label htmlFor="bank" className="text-sm">
                    Bank
                  </label>
                </div>

                <div className="flex space-x-2 mb-4 cursor-pointer">
                  <img src={pay1} alt="Visa" className="w-10 h-6" />
                  <img src={pay2} alt="MasterCard" className="w-10 h-6" />
                  <img src={pay3} alt="Paypal" className="w-10 h-6" />
                  <img src={pay4} alt="Paypal" className="w-10 h-6" />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" id="cash" name="payment" className="mr-2" />
                <label htmlFor="cash" className="text-sm">
                  Cash on delivery
                </label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-64 p-3 border border-gray-300 rounded-l-md"
                />
                <button className="bg-red-500 text-white py-3 px-6 rounded-r-md hover:bg-red-600">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="flex justify-between items-center">
              <button className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
