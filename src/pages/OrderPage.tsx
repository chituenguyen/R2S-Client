import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/context/ToastContext';
import { CartItem } from "../redux/type";

function OrderPage() {
    const { toast } = useToast();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [confirmRemoveItemId, setConfirmRemoveItemId] = useState<string | null>(null);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCartItems);
    }, []);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        const updatedCartItems = cartItems.map((item: CartItem) => {
            if (item.id === Number(itemId)) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleIncrement = (itemId: string) => {
        const updatedCartItems = cartItems.map((item: CartItem) => {
            if (item.id === Number(itemId)) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleDecrement = (itemId: string) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === Number(itemId) && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleRemoveItem = (itemId: string) => {
        setConfirmRemoveItemId(itemId);
    };

    const confirmRemove = () => {
        if (confirmRemoveItemId) {
            const updatedCartItems = cartItems.filter(item => item.id !== Number(confirmRemoveItemId));
            setCartItems(updatedCartItems);
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
            toast("Sản phẩm đã được xóa khỏi giỏ hàng của bạn.");
            setConfirmRemoveItemId(null);
        }
    };

    const cancelRemove = () => {
        setConfirmRemoveItemId(null);
        toast("Hành động xóa sản phẩm đã bị hủy.");
    };

    useEffect(() => {
        calculateSubtotal();
    }, [cartItems]);

    const calculateSubtotal = () => {
        const total = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
        setSubtotal(total);
        localStorage.setItem("total", JSON.stringify(total));
    };

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="flex items-center text-sm text-gray-400 my-[50px] p-4">
                <span className="mr-1">Account</span>
                <span className="mr-1">/</span>
                <span className="mr-1 text-black">Gaming</span>
            </div>

            {/* Product Table */}
            <table className="w-full mb-8 ml-8">
                <thead>
                    <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Quantity</th>
                        <th className="text-left p-4">Subtotal</th>
                        <th className="text-left p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="p-4 flex items-center">
                                <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                                <span className="font-medium">{item.name}</span>
                            </td>
                            <td className="p-4">${item.price}</td>
                            <td className="p-4">
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        onClick={() => handleDecrement(item.id.toString())}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id.toString(), parseInt(e.target.value))}
                                        className="border rounded w-16 text-center"
                                    />
                                    <button
                                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        onClick={() => handleIncrement(item.id.toString())}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="p-4 font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                            <td className="p-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleRemoveItem(item.id.toString())}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirm Remove Modal */}
            {confirmRemoveItemId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded">
                        <h1 className="text-red-500">Bạn có chắc chắn muốn xóa sản phẩm này không?</h1>
                        <div className="flex justify-center mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={confirmRemove}>Xóa</button>
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={cancelRemove}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
                <Link to="/" className="border border-black rounded px-6 py-4">Return To Shop</Link>
            </div>

            {/* Coupon and Total Information */}
            <div className="grid grid-cols-2 gap-4 mb-8 mt-10">
                <div>
                    <input type="text" placeholder="Coupon Code" className="border rounded p-2 w-2/3 mr-8" />
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-2">
                        Apply Coupon
                    </button>
                </div>
                <div className="border border-black rounded p-4 w-2/3 ml-auto">
                    <div className="font-bold mb-2 text-3xl">Cart Total</div>
                    <div className="flex justify-between mb-2 border-b border-gray-200">
                        <span className="font-semibold">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 border-b border-gray-200">
                        <span className="font-semibold">Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Total:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/checkout" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-1/2 flex justify-center items-center">
                            Process to checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;