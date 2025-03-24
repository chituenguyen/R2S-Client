import { useState, useEffect } from "react";
import {CartItem,Orders,orderData} from "../redux/type";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../components/context/ToastContext";
import * as product from "../api/product";
import { useForm } from "react-hook-form";

type OrdersWithToken = Orders & { accessToken: string };
function Checkout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [saveInfo, setSaveInfo] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem("orderData")) {
            setSaveInfo(true);
        }
        else {
            setSaveInfo(false);
        }
    }, []);
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
      } = useForm<orderData>();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        const storedSubtotal = JSON.parse(localStorage.getItem("total") || "[]");
        setCartItems(storedCartItems);
        setSubtotal(storedSubtotal);
    }, []);

    useEffect(() => {
        const storedOrderData = localStorage.getItem('orderData');
        if (storedOrderData) {
            const orderData = JSON.parse(storedOrderData);
            setValue('name', orderData.name || '');
            setValue('LastName', orderData.LastName || '');
            setValue('address', orderData.address || '');
            setValue('apartment', orderData.apartment || '');
            setValue('city', orderData.city || '');
            setValue('phone', orderData.phone || '');
            setValue('email', orderData.email || '');
        }
    }, [setValue]);

    const mutation = useMutation({
        mutationKey: ["order"], 
        mutationFn: (data: Orders) => product.pushOrder(data),
        onSuccess: () => {

         }
    });
    const{isPending, data, error} = mutation;
    // console.log("Data:", data);
    // console.log("Error:", error);
    // console.log("isLoading:", isPending);

    const onSubmit = (data: orderData) => {
        const orderform : orderData = {
            name: data.name,
            LastName: data.LastName,
            address: data.address,
            apartment: data.apartment,
            city: data.city,
            phone: data.phone,
            email: data.email,
        };
        // console.log("orderData", orderform);
        PlaceOrders(orderform);
        return orderform;
    }
    
    const PlaceOrders = (orderform: orderData) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const accessToken: string | null = localStorage.getItem("access_token");
        const Order: Orders = {
            userId: user.id || 0,
            name: orderform.name,
            address: orderform.address,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };
        const userData = {
            name: orderform.name,
            LastName: orderform.LastName,
            address: orderform.address,
            email: orderform.email,
        };
        if (saveInfo) {
            localStorage.setItem('orderData', JSON.stringify(orderform));
            localStorage.setItem('userdata', JSON.stringify(userData));
          } else {
            localStorage.removeItem('orderData');
          }
    if (accessToken) {
        // If access token is available, include it in the order data
        const orderWithToken: OrdersWithToken = { ...Order, accessToken };
        mutation.mutate(orderWithToken);
        toast("Đặt hàng thành công");
    } else {
        // console.error("No access token found for placing order.");
        toast("Đặt hàng thất bại. Vui lòng đăng nhập.");}
    }

    const handleSaveInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaveInfo(event.target.checked);
    };

    


    return (
        <div>
            <div className="max-w-full mx-auto p-4">
                {/* Header */}
                <div className="flex space-x-4 mb-8">
                    <a href="#" className="text-gray-600 hover:text-gray-800">Account</a>
                    <span className="mr-1">/</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800">My Account</a>
                    <span className="mr-1">/</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800">Product</a>
                    <span className="mr-1">/</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800">View Cart</a>
                    <span className="mr-1">/</span>
                    <a href="#" className="text-black hover:text-black">CheckOut</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Billing Details */}
                    <div className="w-4/5">
                        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
                        <form className="space-y-4"  onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name*</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="Name" type="text" placeholder="" 
                                        {...register('name', { required: true })}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LastName">Last Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="" 
                                {...register('LastName', { required: true })}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetAddress">Street Address*</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="streetAddress" type="text" placeholder="" 
                                        {...register('address', { required: true })}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apartment">Apartment, floor, etc. (optional)</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="apartment" type="text" placeholder=""
                                        {...register('apartment', { required: true })}
                                        />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="townCity">Town/City*</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="townCity" type="text" placeholder="" 
                                {...register('city', { required: true })}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number*</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="phoneNumber" type="tel" placeholder="" 
                                        {...register('phone', { required: true })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAddress">Email Address*</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                         id="emailAddress" type="email" placeholder="" 
                                         {...register('email', { required: true })} 
                                         />
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox"
                                            className="form-checkbox h-5 w-5 text-red-600"
                                            checked={saveInfo}
                                            onChange={handleSaveInfoChange} />
                                    <span className="ml-2 text-sm text-gray-700">Save this information for faster check-out next time</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-gray-100 p-4 rounded">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center mb-2">
                                    <span className="p-4 flex items-center">
                                        <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                                        <span className="font-medium">{item.name}</span>
                                    </span>
                                    <span className="p-4">${item.price}</span>
                                </div>
                            ))}

                           
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <hr className="my-4 border-black" />
                            <div className="flex justify-between mb-2">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <hr className="my-4 border-black" />
                            <div className="flex justify-between font-semibold mb-4">
                                <span>Total:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-4">
                                <label className="flex items-center justify-between">
                                    <div className="flex">
                                        <input type="radio" className="form-radio h-5 w-5 text-red-600" name="payment" value="bank" />
                                        <span className="ml-2 text-sm text-gray-700">Bank</span>
                                    </div>
                                    <div className="flex">
                                        <img src="https://s3-alpha-sig.figma.com/img/bacb/ff99/a8fc8e50822cb2d2d168e5d0e8bf7ea6?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=toZvrKiSocXsMa1YsuD-ahFZP2Gb0mKB1qUJ5V8dRGwcP9m-tL7GcOL5UcyF0erG~EPhE3ePytOw-2QMVoaOYjdE4UYNp-QB6mkDZ3afs8luc001O8sEckaHjQ2W9jh33P6m-1gld4F~UoqrYhe2QIBJPOVYNJXlrgm7uRHy3FFZOcfxRXWZDKbbAZZN01fx1rxHTYW~bQINhJDT4ogakxL5Q2Z0UzyUAWvA9afaHk~mz5X1nR0a2~WMyS1PLp0c13fgN346DOn~uJ1SdnwE9U9qQQ0uglzj24KzU-os6oLEx-rD5UyAokZWlla9rxNjbFKbuAD7U7FxtRw0OG4CSw__"
                                            className="h-[28px] w-[42px] mr-2" />
                                        <img src="https://s3-alpha-sig.figma.com/img/cfb0/a6ee/01b240273b40dab07f8246ef98aed88a?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BijXo0nYmmMAbl~OUQKX0CCnNImAHjwc4BM7~j-ILlf3KvCrYUk0FZANH0jUjmOw0q-~kDQnJOax5UDIImvOJlTi3xzgGuwwq~XjKcYzlKm3mhu7I2hh~hvbLi-MMMeFvJwf9ORg3REl006LJyjSbUI9tjd9M343uT4Jf30S1wkIVvnrvyyuDhmuZ~H4GROWcK8eZQV1R-rK0lnA8sKDdo3htPFGva-ISPb0ox6biZx07PN7k4vjVXy-~08oqZXwzUMZ~dLJHBaWtcnDED0j44NVpor28djtf00G5Ojq5~2Tc8c2EGRspdhKSU0Uiim3mSulk5wBrpU5UYBXpZPflA__"
                                            className="h-[28px] w-[42px] mr-2" />
                                        <img src="https://s3-alpha-sig.figma.com/img/6eef/b61d/27c754abac218d25d8ea4360de61f8e8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FLee6QGIwtGUKyq-A-EMCFxPUpn3JovFSanMIUX3eCm~31DGvOrfnz7j0DeztyxY6jTqMlSc8vnQDmnvZsNxR6xO4MJRqeeVPCfVTQECYQjMrzJPeGQoqMETAkSHxeUggwk6QxI8ib3D9Y-aPvS2uLC6zHMgrX1P2m~XG00Ov5Wvtyq8f0RuzWyqB05iKcYYl929YFRoxNpaI8B6z2oMYzQqZ2wORMbH7X4N1AvnkcxOl6FNlSLBVA0YV0ZzVjNnXMhW-J6Sd0pwauPuHy6OV3QGVAnCcc-SFpEZXEp~S00E6B4v~imjt5JYxEmiaef69f0eZNedEKPhNBsphzG4rA__"
                                            className="h-[28px] w-[42px] mr-2" />
                                        <img src="https://s3-alpha-sig.figma.com/img/b28e/31b9/c88d0c9b038b82deeb0523d82cffe267?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MqZIaQ3bfstvgXxWg7ntQte6z-saG~WeHw3G59~5rna3EzSBHvs9-m85jzokRe84D4rXvq-4IndmCNpEl3zb4RlFBJ1KzsY-Cd8ZZeFSfsqiVopmh2heBwNG7KATwSrRo18qH1bGn6fih3eVRmWBfc1WOhuskvGpaKU9Rm8Ok93vpO4Bo3R16mQwdes2SIJwzy0ILOzTj11jpwVTXJpYGThYgEWy98MfS0oDpkN7LkMsisOUBgRBFsUII09RmnuCY90aj4bsC5R6yxSxQR4Uex5894B5teinOrIkxYYRX~BTqZQb2MaFKilJSZwWEfd2ez79Bp5O2ijDoJLnTp~yPQ__"
                                            className="h-[28px] w-[42px] mr-2" />
                                    </div>
                                </label>
                                <br />
                                <label className="flex items-center">
                                    <input type="radio" className="form-radio h-5 w-5 text-red-600" name="payment" value="cash" />
                                    <span className="ml-2 text-sm text-gray-700">Cash on delivery</span>
                                </label>
                            </div>

                            {/* Coupon Code */}
                            <div className="flex mb-4">
                                <input
                                    className="w-1/2 shadow appearance-none border border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="coupon"
                                    type="text"
                                    placeholder="Coupon Code"
                                />
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                    Apply Coupon
                                </button>
                            </div>

                            {/* Place Order Button */}
                            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-1/3"
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isPending}>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;