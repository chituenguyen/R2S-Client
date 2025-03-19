import React, { useEffect, useState } from "react"
import { CartItem } from "../redux/types/user.types"

const CheckOut = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") ?? "[]"
    )
    setCart(storedCart)

    // Tính tổng tiền
    const totalAmount = storedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    setTotal(totalAmount)
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 text-gray-500 text-[14px]">
        <a href="/" className="hover:underline">Account / My Account / Product / View Cart</a> / <span className="font-normal text-black">CheckOut</span>
      </div>
      <div className="h-6"></div>
      <h1 className="text-4xl font-semibold mb-4">Billing Details</h1>
      <div className="flex flex-col md:flex-row gap-8">
      {/* Left: Billing Details */}
      <div className="w-full md:w-1/2">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <form className="space-y-4">
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block font-medium">Company Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label className="block font-medium">Street Address</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your street address"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your apartment.."
                />
              </div>
              <div>
                <label className="block font-medium">Town/City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your town/city"
                />
              </div>
              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Save this information for faster check-out next time
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
        <div className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}

          <div className="flex justify-between text-lg font-medium border-t pt-4">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium border-t pt-4">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total:</span>
            <span>${(total + 5).toFixed(2)}</span>
          </div>
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2">
              <input type="radio" id="bankPayment" name="payment" className="w-4 h-4" />
              <label htmlFor="bankPayment" className="cursor-pointer">Bank</label>
              <div className="flex gap-2 ml-2">
                <img
                  src="assets/a8fc8e50822cb2d2d168e5d0e8bf7ea6.png"
                  alt="Bank 1"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <img
                  src="assets/27c754abac218d25d8ea4360de61f8e8.png"
                  alt="Bank 2"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <img
                  src="assets/01b240273b40dab07f8246ef98aed88a.png"
                  alt="Bank 3"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <img
                  src="assets/c88d0c9b038b82deeb0523d82cffe267.png"
                  alt="Bank 4"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="w-4 h-4" />
              Cash on delivery
            </label>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className=" p-2 border rounded-md"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">
              Apply Coupon
            </button>
          </div>
          <button className=" bg-red-600 text-white px-4 py-2 rounded-md mt-4">
            Place Order
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CheckOut
