import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [updatedCart, setUpdatedCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setUpdatedCart(storedCart);
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
    const updated = updatedCart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + (type === "increase" ? 1 : -1)) }
        : item
    );
  
    setUpdatedCart(updated); // Chỉ cập nhật updatedCart
  };
  

  const handleUpdateCart = () => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto py-12 mt-20">
      <div className="flex items-center space-x-2 text-gray-500 text-[14px]">
        <a href="/" className="hover:underline">Home</a>
        <img src="/CrossLine.svg" alt="CrossLine" className="w-[7px]" />
        <span className="font-medium text-black">Cart</span>
      </div>
      <div>
      <div className="mt-10">
      <div className="w-full">
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
    {updatedCart.length > 0 ? (updatedCart.map((item) => (
      <tr key={item.id} className="shadow-md rounded">
        <td className="p-4 flex items-center gap-2 min-w-[380px] text-[16px]">
          <img src={item.image} alt={item.name} className="w-16 h-16" />
          {item.name}
        </td>
        <td className="p-4 min-w-[180px] text-[16px]">${item.price}</td>
        <td className="p-4 min-w-[180px]">
        <div className="flex flex-row items-center">
            <div className="flex flex-col items-center justify-center gap-y-2">
                <button onClick={() => handleQuantityChange(item.id, "increase")} className="group border border-black">
                    <img src="/Drop-Up-Small.svg" alt="Drop-Up-Small" className="w-[16px] h-[16px] group-hover:bg-gray-200 group-hover:font-bold transition-transform" />
                </button>

                <button onClick={() => handleQuantityChange(item.id, "decrease")} className="group border border-black">
                    <img src="/Drop-Down-Small.svg" alt="Drop-Down-Small" className="w-[16px] h-[16px] group-hover:bg-gray-200 group-hover:font-bold transition-transform" />
                </button>
            </div>
            <span className="text-[16px] mx-4">{item.quantity}</span>
        </div>

        </td>

        <td className="p-4 min-w-[180px] text-[16px]">${ (item.price * item.quantity).toFixed(2) }</td>
        <td className="p-4 min-w-[180px] text-center">
          <button
            className="text-[16px] text-red-500 hover:underline"
            onClick={() => handleRemoveItem(item.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    ))
) : (
    <tr className="shadow-md rounded">      
      <td className="p-4 flex items-center gap-2 min-w-[380px] text-[16px]">
          Your cart is empty.
        </td>
        <td className="p-4 min-w-[180px] text-[16px]">$0</td>
        <td className="p-4 min-w-[180px] text-[16px]">
          <input
            type="number"
            value={0}
            className="w-16 border border-gray-300 p-1 text-center text-[16px]"
            min="1"
            readOnly
          />
        </td>
        <td className="p-4 min-w-[180px] text-[16px]">$0</td>
        <td className="p-4 min-w-[180px] text-center">
        </td>
    </tr>
  )

}
  </tbody>
</table>

      </div>
          <div className="flex justify-between mt-6">
            <a href="/" className="px-4 py-2 bg-gray-200 text-black rounded text-[16px]">
            Return To Shop
            </a>
            <button className="px-4 py-2 bg-red-500 text-white rounded text-[16px]" onClick={handleUpdateCart}>
              Update Cart
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[60%_40%] gap-10 mt-10">
        <div className="justify-between">

        <div className="flex">
            <input 
                type="text" 
                placeholder="Coupon Code" 
                className="border border-black px-4 py-2 w-[300px] h-[56px] text-gray-500 text-[16px] rounded"
            />
            <button className="bg-red-500 text-white px-6 py-2 mx-4 text-[16px] w-[211px] h-[56px] rounded">
                Apply Coupon
            </button>
        </div>
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
          <button className="w-full mt-4 ml-12 w-[260px] h-[56px] bg-red-500 text-white rounded">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;