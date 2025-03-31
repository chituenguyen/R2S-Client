import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createOrders } from "../../useQuery/api/api";
import { toast } from "react-toastify";
import { useCity } from "../../useQuery/hooks/useCity";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
    const navigate = useNavigate()
    const {data, isLoading} = useCity()
    const [paymentMethod, setPaymentMethod] = useState();
    const [userId, setUserId] = useState<number>(null)
    const [total, setTotal]=useState<number>(0)
    const [formData, setFormData] = useState({
        firstName: "",
        streetAddress: "",
        city: ""
    });
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUserId(savedUser?.id)
    }, []);

    useEffect(()=>{
        const saveTotal=JSON.parse(localStorage.getItem("Total"))
        setTotal(saveTotal)
    }, [])

    useEffect(()=>{
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
    }, []);  
    const mutation = useMutation({
        mutationFn: createOrders,
        onSuccess: (data) =>{
            toast.success("Tạo Order thành công",{position:"top-right"})
            localStorage.removeItem('cart')
            setTimeout(() => {
                navigate('/');
            }, 1000);
        },
        onError: (error) =>{
            console.log("err", error)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleOrder = (e: React.FormEvent) =>{

        if (!formData.firstName.trim() || !formData.streetAddress.trim() || !formData.city.trim()) {
            toast.error("Vui lòng điền đầy đủ thông tin trước khi đặt hàng!"); 
            return;
        }

        const OrderData = {
            userId: userId,
            name: formData.firstName, 
            address: formData.streetAddress + ', ' + formData.city,
            items: cart.map(item => ({ productId: item.product.id, quantity: item.quantity }))
        };
        mutation.mutate(OrderData)
    }

    return(
        <div className="max-w-7xl mx-auto p-6 space-y-10">
            <div className="space-x-2">
                <span className="text-sm text-zinc-500">Account /</span>
                <span className="text-sm text-zinc-500">My Account /</span>
                <span className="text-sm text-zinc-500">Product /</span>
                <span className="text-sm text-zinc-500">View Cart /</span>
                <span className="text-sm">Checkout</span>
            </div>
            <div className="md:flex">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold">Billing Details</h1>
                    <p className="text-zinc-400 text-sm">First Name</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md" required name="firstName" value={formData.firstName} onChange={handleChange}/>
                    <p className="text-zinc-400 text-sm">Company Name</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md"/>
                    <p className="text-zinc-400 text-sm">Street Address</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md" required name="streetAddress" value={formData.streetAddress} onChange={handleChange}/>
                    <p className="text-zinc-400 text-sm">Apartment, floor, etc</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md" />
                    <p className="text-zinc-400 text-sm">Town/City</p>
                    <select
                        className="w-96 h-12 p-2 shadow-md rounded-md"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        >
                    {data?.map((city)=>(
                        <option>{city.name}</option>
                    ))}
                    </select>
                    {/* <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md" name="city" value={formData.city} onChange={handleChange}/> */}
                    <p className="text-zinc-400 text-sm">Phone Number</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md" />
                    <p className="text-zinc-400 text-sm">Email Address</p>
                    <input type="text" className="w-96 h-12 p-2 shadow-md rounded-md"/>
                    <div className="space-x-3">
                        <input type="checkbox" />
                        <span className="text-sm">Save this information for faster check-out next time</span>
                    </div>
                </div>
                <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                    {cart.map((item)=>(
                            <div key={item.product.id} className="flex justify-between items-center">
                                <img src={item.product.images[0]} className="w-10 h-10"/>
                                <span>{item.product.name}</span>
                                <span className="font-medium">${Math.round(item.product.price * item.quantity)}</span>
                            </div>
                    ))}
                        <hr />
                            <div className="flex justify-between items-center">
                                <span>Subtotal:</span>
                                <span className="font-medium">${Math.round(total)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Shipping:</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between items-center font-semibold text-lg">
                                <span>Total:</span>
                                <span>${Math.round(total)}</span>
                            </div>
                        <hr />
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                type="radio"
                                name="payment"
                                value="bank"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                                />
                                <span>Bank</span>
                                <span><img src="images\bkash.png" className="w-10 h-7" alt="" /></span>
                                <span><img src="images\visa.png" className="w-10 h-3" alt="" /></span>
                            </label>
                            <label className="flex items-center space-x-2 mt-2">
                                <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={() => setPaymentMethod("cash")}
                                />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="flex-1 p-2 border rounded-md"
                            />
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Apply Coupon
                            </button>
                        </div>
                            <button onClick={handleOrder} disabled={mutation.isLoading} className="w-full bg-red-500 text-white py-2 rounded-md mt-4">
                            {mutation.isLoading ? "Creating...":"Place Order"}
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}


export default CheckOutPage