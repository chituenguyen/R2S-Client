import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ship1 from "../../assets/product1.jpg";
import Navbarpage from "./Navbarpage";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}
function CartPage() {
  // Retrieve the cart data from localStorage
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    const storedOrders: OrderItem[] = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
    
    // Tính toán tổng tiền ban đầu
    calculateTotal(storedOrders);
  }, []);

  // Function to calculate total price
  const calculateTotal = (orders: OrderItem[]) => {
    const newTotal = orders.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(newTotal);
  };

// Function to delete an item from the cart
const deleteItem = (id: number) => {
  const updatedOrders = orders.filter((item) => item.id !== id);
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
  setOrders(updatedOrders);
  calculateTotal(updatedOrders);
};

  // Function to update the quantity and total price
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from being less than 1

    const updatedOrders = orders.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity // Ensure totalPrice is calculated correctly
        };
      }
      return item;
    });

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    calculateTotal(updatedOrders);
  };
  return (
    <div className="w-full mx-auto mt-10">
      <Link to="/home">
        <Navbarpage />
      </Link>
      {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>

      <div className="container mx-auto p-6 mt-20">
        {/* Giỏ hàng với viền */}
        <div className="bg-white p-6 shadow-md rounded-lg border-2 border-gray-300">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

          <table className="min-w-full table-auto mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Subtotal</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                orders.map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="py-4 px-4">
                      <div className="flex items-center relative">
                        <img
                          src={item.image || ship1}
                          alt={item.name}
                          className="w-20 h-20 object-cover mr-4"
                        />
                        <button
                          className="absolute top-[-5px] ml-[-4px] bg-[#DB4444] text-white rounded-full w-4 h-4 flex justify-center items-center"
                          onClick={() => deleteItem(item.id)}
                        >
                          <span className="text-lg mt-[-5px]">x</span>
                        </button>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{item.price}$</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1} // Disable button if quantity is 1
                        
                        >
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-16 p-2 border rounded-md"
                          min="1"
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">{item.totalPrice}$</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
              Return to Shop
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
              Update Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-6 h-[324px] mt-10">
        {/* Left Side: Coupon Code */}
        <div className="mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="w-80 p-2 border-2 border-gray-300 rounded-l-md"
            />
            <button className="bg-red-500 text-white py-2 px-4 rounded-r-md hover:bg-red-600">
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Right Side: Cart Total */}
        <div className="bg-white w-[470px] h-[324px] p-6 shadow-md rounded-lg border-2 border-gray-300">
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
          <Link to="/checkout">
            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
