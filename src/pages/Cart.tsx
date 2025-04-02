import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
   // State để lưu trữ danh sách sản phẩm trong giỏ hàng
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout"); // Chuyển hướng đến trang CheckOut
  };
  // Hàm lấy giỏ hàng từ localStorage
  const getCartFromLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  // Lấy giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    getCartFromLocalStorage();
  }, []);
  
  // Cập nhật giỏ hàng khi localStorage thay đổi từ các trang khác
  useEffect(() => {
    const handleStorageChange = () => {
      getCartFromLocalStorage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Cập nhật localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage ngay lập tức
  };

  // Thay đổi số lượng sản phẩm
  const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + (type === "increase" ? 1 : -1)) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage ngay lập tức
  };

  return (
    <div className="container mx-auto py-12 mt-24">
      <div className="flex items-center space-x-2 text-gray-500 text-[14px]">
        <a href="/" className="hover:underline">Home</a> / <span className="font-normal text-black">Cart</span>
      </div>

      <div className="mt-10 w-full">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead className="shadow-md rounded">
            <tr>
              <th className="p-4 w-2/5 text-[16px]">Product</th>
              <th className="p-4 w-1/5 text-left text-[16px]">Price</th>
              <th className="p-4 w-1/5 text-left text-[16px]">Quantity</th>
              <th className="p-4 w-1/5 text-left text-[16px]">Subtotal</th>
              <th className="p-4 w-1/5 text-[16px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id} className="shadow-md rounded">
                  <td className="p-4 flex items-center gap-2 min-w-[380px] text-[16px]">
                    <img src={item.images} alt={item.name} className="w-16 h-16" />
                    {item.name}
                  </td>
                  <td className="p-4 min-w-[180px] text-[16px]">${item.price}</td>
                  <td className="p-4 min-w-[180px]">
                    <div className="flex flex-row items-center">
                      <button onClick={() => handleQuantityChange(item.id, "increase")} className="border border-black p-1">
                        +
                      </button>
                      <span className="text-[16px] mx-4">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, "decrease")} className="border border-black p-1">
                        -
                      </button>
                    </div>
                  </td>
                  <td className="p-4 min-w-[180px] text-[16px]">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-4 min-w-[180px] text-center">
                    <button className="text-[16px] text-red-500 hover:underline" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="shadow-md rounded">
                <td className="p-4 text-[16px] text-center" colSpan={5}>Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <a href="/" className="px-4 py-2 bg-gray-200 text-black rounded text-[16px]">
            Return To Shop
          </a>
        </div>
      </div>

      <div className="grid grid-cols-[60%_40%] gap-10 mt-10">
        <div className="flex">
          <input type="text" placeholder="Coupon Code" className="border border-black px-4 py-2 w-[300px] h-[56px] text-gray-500 text-[16px] rounded" />
          <button className="bg-red-500 text-white px-6 py-2 mx-4 text-[16px] w-[211px] h-[56px] rounded">
            Apply Coupon
          </button>
        </div>

        <div className="border border-black p-6 rounded w-[400px]">
          <h2 className="text-[20px] font-medium mb-4">Cart Total</h2>
          <div className="flex justify-between mb-4 text-[16px] border-b border-gray-400">
            <span>Subtotal:</span>
            <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-[16px] border-b border-gray-400">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-[16px]">
            <span>Total:</span>
            <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-red-500 text-white py-3 rounded" onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
