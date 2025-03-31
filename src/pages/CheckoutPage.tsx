import React, { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);

    const savedBilling = JSON.parse(localStorage.getItem("billingDetails") || "{}");
    if (Object.keys(savedBilling).length > 0) {
      setBillingDetails(savedBilling);
      setSaveInfo(true);
    }
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (cartItems.length === 0) throw new Error("Your cart is empty");

      const orderData = {
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        paymentMethod,
        billingDetails,
      };

      const response = await fetch("http://localhost:3003/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Order failed.");

      if (saveInfo) {
        localStorage.setItem("billingDetails", JSON.stringify(billingDetails));
      } else {
        localStorage.removeItem("billingDetails");
      }

      localStorage.removeItem("cart");
      setCartItems([]);
      setBillingDetails({
        firstName: "",
        companyName: "",
        streetAddress: "",
        apartment: "",
        townCity: "",
        phoneNumber: "",
        emailAddress: "",
      });

      setSuccessMessage("Order successfully");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl flex flex-wrap lg:flex-nowrap gap-10">
      <div className="flex-1 bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
        <form className="space-y-4">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Company Name", name: "companyName" },
            { label: "Street Address", name: "streetAddress" },
            { label: "Apartment, floor, etc. (optional)", name: "apartment" },
            { label: "Town/City", name: "townCity" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Email Address", name: "emailAddress" },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-semibold mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                className="w-full border px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
                value={billingDetails[field.name]}
                onChange={(e) => setBillingDetails({ ...billingDetails, [field.name]: e.target.value })}
              />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-red-500 focus:ring-red-500 border-red-500 checked:bg-red-500"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            />
            <label className="text-sm">Save this information for faster check-out next time</label>
          </div>
        </form>
      </div>

      <div className="w-full lg:w-[400px] bg-white p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Your Order</h3>
        <div className="space-y-2 text-gray-700">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2 text-lg">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 space-y-2 border-t pt-4 text-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-semibold">Free</span>
          </div>
          <hr />
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-2 text-lg">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            Bank Transfer
          </label>
          <label className="flex items-center gap-2 text-lg">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash on Delivery
          </label>
        </div>

        <button
          className={`w-40 mt-6 bg-red-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;
