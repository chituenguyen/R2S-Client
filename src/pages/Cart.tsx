import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const getCartFromLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };  

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      getCartFromLocalStorage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + (type === "increase" ? 1 : -1)) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 mt-16 md:mt-24">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-gray-500 text-sm sm:text-[14px]">
        <a href="/" className="hover:underline">Home</a> / <span className="font-normal text-black">Cart</span>
      </div>

      {/* Cart Table - Desktop */}
      <div className="mt-8 w-full hidden md:block">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead className="shadow-md rounded">
            <tr>
              <th className="p-4 w-2/5 text-sm sm:text-[16px]">Product</th>
              <th className="p-4 w-1/5 text-left text-sm sm:text-[16px]">Price</th>
              <th className="p-4 w-1/5 text-left text-sm sm:text-[16px]">Quantity</th>
              <th className="p-4 w-1/5 text-left text-sm sm:text-[16px]">Subtotal</th>
              <th className="p-4 w-1/5 text-sm sm:text-[16px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id} className="shadow-md rounded">
                  <td className="p-4 flex items-center gap-2 min-w-[200px] sm:min-w-[380px] text-sm sm:text-[16px]">
                    <img src={item.images} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16" />
                    {item.name}
                  </td>
                  <td className="p-4 min-w-[120px] sm:min-w-[180px] text-sm sm:text-[16px]">${item.price}</td>
                  <td className="p-4 min-w-[120px] sm:min-w-[180px]">
                    <div className="flex flex-row items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, "increase")} 
                        className="border border-black p-1 text-sm sm:text-base"
                      >
                        +
                      </button>
                      <span className="text-sm sm:text-[16px] mx-2 sm:mx-4">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, "decrease")} 
                        className="border border-black p-1 text-sm sm:text-base"
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td className="p-4 min-w-[120px] sm:min-w-[180px] text-sm sm:text-[16px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4 min-w-[120px] sm:min-w-[180px] text-center">
                    <button 
                      className="text-sm sm:text-[16px] text-red-500 hover:underline" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="shadow-md rounded">
                <td className="p-4 text-sm sm:text-[16px] text-center" colSpan={5}>Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <a href="/" className="px-3 sm:px-4 py-2 bg-gray-200 text-black rounded text-sm sm:text-[16px]">
            Return To Shop
          </a>
        </div>
      </div>

      {/* Cart Items - Mobile */}
      <div className="mt-6 block md:hidden">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img src={item.images} alt={item.name} className="w-12 h-12" />
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="border border-gray-300 px-2 py-1 text-sm"
                  >
                    -
                  </button>
                  <span className="mx-3 text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="border border-gray-300 px-2 py-1 text-sm"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="shadow-md rounded-lg p-6 text-center">
            <p className="text-sm sm:text-[16px]">Your cart is empty.</p>
            <a 
              href="/" 
              className="inline-block mt-4 px-4 py-2 bg-gray-200 text-black rounded text-sm sm:text-[16px]"
            >
              Return To Shop
            </a>
          </div>
        )}
      </div>

      {/* Coupon and Total */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 mt-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Coupon Code" 
            className="border border-black px-4 py-3 w-full sm:w-[300px] h-[56px] text-gray-500 text-sm sm:text-[16px] rounded" 
          />
          <button className="bg-red-500 text-white px-4 sm:px-6 py-3 text-sm sm:text-[16px] w-full sm:w-[211px] h-[56px] rounded">
            Apply Coupon
          </button>
        </div>

        <div className="border border-black p-4 sm:p-6 rounded w-full lg:w-[400px]">
          <h2 className="text-lg sm:text-[20px] font-medium mb-4">Cart Total</h2>
          <div className="flex justify-between mb-3 pb-3 border-b border-gray-400">
            <span className="text-sm sm:text-[16px]">Subtotal:</span>
            <span className="text-sm sm:text-[16px]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3 pb-3 border-b border-gray-400">
            <span className="text-sm sm:text-[16px]">Shipping:</span>
            <span className="text-sm sm:text-[16px]">Free</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm sm:text-[16px] font-medium">Total:</span>
            <span className="text-sm sm:text-[16px] font-medium">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full mt-4 bg-red-500 text-white py-3 rounded text-sm sm:text-[16px]"
            disabled={cart.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;