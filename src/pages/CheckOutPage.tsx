import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Truck, CheckCircle } from 'lucide-react';
import ChatPage from './ChatPage';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

interface CustomerInfo {
  firstName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phoneNumber: string;
  email: string;
  saveInfo: boolean;
  paymentMethod: string;
  orderTotal: number;
  discount: number;
  items: OrderItem[];
}

interface OrderResponse {
  id: string;
  status: OrderStatus;
}

function CheckoutPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrders: OrderItem[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = storedOrders.map(item => ({
      ...item,
      totalPrice: item.price * item.quantity
    }));
    
    setOrders(updatedOrders);
    const calculatedTotal = updatedOrders.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalPrice(calculatedTotal);
  }, []);

  // Poll order status
  useEffect(() => {
    if (!orderId) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`https://devapi.uniscore.vn/uri/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order status');
        
        const data: OrderResponse = await response.json();
        setOrderStatus(data.status);

        // Stop polling if order is delivered
        if (data.status === 'delivered') return;

        // Continue polling every 2 seconds
        setTimeout(pollStatus, 2000);
      } catch (error) {
        console.error('Error polling order status:', error);
      }
    };

    pollStatus();
  }, [orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const customerInfo: CustomerInfo = {
      firstName: formData.get("first-name") as string,
      companyName: formData.get("company-name") as string,
      streetAddress: formData.get("street-address") as string,
      apartment: formData.get("apartment") as string,
      townCity: formData.get("town-city") as string,
      phoneNumber: formData.get("phone-number") as string,
      email: formData.get("email-address") as string,
      saveInfo: formData.get("save-info") === "on",
      paymentMethod: formData.get("payment") as string,
      orderTotal: totalPrice - discount,
      discount: discount,
      items: orders
    };

    try {
      const response = await fetch('https://devapi.uniscore.vn/uri/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          items: orders,
          totalAmount: totalPrice - discount,
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData: OrderResponse = await response.json();
      setOrderId(orderData.id);
  
      const orderInfo = {
        ...customerInfo,
        orderId: orderData.id,
        orderStatus: 'pending',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('order_' + orderData.id, JSON.stringify(orderInfo));
  
      localStorage.removeItem("orders");
      setOrders([]);
      setTotalPrice(0);
  
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  
  };

  const OrderStatusIndicator = () => {
    const statuses = [
      { status: 'pending', icon: ShoppingBag, label: 'Order Placed' },
      { status: 'processing', icon: CreditCard, label: 'Processing Payment' },
      { status: 'shipped', icon: Truck, label: 'Shipped' },
      { status: 'delivered', icon: CheckCircle, label: 'Delivered' }
    ];

    const getStatusIndex = (status: OrderStatus) => {
      return statuses.findIndex(s => s.status === status);
    };

    const currentIndex = getStatusIndex(orderStatus);

    return (
      <div className="w-full mb-8">
        <div className="flex justify-between items-center relative">
          {statuses.map((status, index) => {
            const Icon = status.icon;
            const isActive = index <= currentIndex;
            
            return (
              <div key={status.status} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`mt-2 text-sm ${
                  isActive ? 'text-green-500 font-medium' : 'text-gray-500'
                }`}>
                  {status.label}
                </span>
              </div>
            );
          })}
          
          <div className="absolute top-5 left-0 h-1 bg-gray-200 w-full -z-10">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto mt-10">
      <ChatPage/>
      <Link to="/home" className="block mb-5">
        <h1 className="text-2xl font-bold text-center">Checkout</h1>
      </Link>
      
      <div className="max-w-7xl mx-auto px-4">
        <OrderStatusIndicator />
        
        {orderStatus === 'delivered' ? (
          <div className="text-center py-10">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Order Completed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
            <Link 
              to="/home" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Billing Details Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="company-name"
                      id="company-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                      Apartment, suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="town-city" className="block text-sm font-medium text-gray-700">
                      Town/City
                    </label>
                    <input
                      type="text"
                      name="town-city"
                      id="town-city"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone-number"
                      id="phone-number"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="save-info"
                      id="save-info"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="save-info" className="ml-2 block text-sm text-gray-900">
                      Save this information for next time
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="credit-card"
                          id="credit-card"
                          required
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-900">
                          Credit Card
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          id="paypal"
                          required
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="paypal" className="ml-2 block text-sm text-gray-900">
                          PayPal
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing || orders.length === 0}
                  className={`mt-6 w-full py-3 rounded-md ${
                    isProcessing || orders.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {orders.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(totalPrice - discount).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter code"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      onClick={() => {
                        console.log('Applying coupon:', couponCode);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;