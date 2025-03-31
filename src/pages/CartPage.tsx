import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity = Math.max(1, newQuantity);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="py-3 px-4">${Number(item.price).toFixed(2)}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                    min="1"
                  />
                </td>
                <td className="py-3 px-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap justify-between items-start">
        <div className="flex flex-col">
          <button className="px-3 py-2 border rounded mb-4">
            Return To Shop
          </button>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border px-4 py-2 rounded"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Apply Coupon
            </button>
          </div>
        </div>
        <button className="px-4 py-2 border rounded">Update Cart</button>
      </div>

      <div className="mt-6 bg-white border border-gray-400 p-4 rounded max-w-sm ml-auto">
        <h3 className="text-lg font-semibold">Cart Total</h3>
        <p className="flex justify-between">
          <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping:</span> <span>Free</span>
        </p>
        <hr className="my-2" />
        <p className="flex justify-between text-lg font-semibold">
          <span>Total:</span> <span>${subtotal.toFixed(2)}</span>
        </p>
        <button
          className="w-full mt-4 bg-red-500 text-white py-2 rounded"
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
