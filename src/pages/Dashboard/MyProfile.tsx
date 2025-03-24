import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { orderData } from "../../redux/type"; // Adjust the import path as needed
import { useToast } from "../../components/context/ToastContext";


function MyProfile() {
     const {
            register,
            handleSubmit,
            formState: { errors },
            setError,
            setValue,
          } = useForm<orderData>();
          
    const { toast } = useToast();
    const user = localStorage.getItem("orderData") || null;
    useEffect(() => {
        const orderData = localStorage.getItem("orderData") || localStorage.getItem("userdata") || null;
        if (orderData) {
          const parsedOrderData = JSON.parse(orderData);
          setValue("name", parsedOrderData.name || "");
          setValue("LastName", parsedOrderData.LastName || "");
          setValue("email", parsedOrderData.email || "");
          setValue("address", parsedOrderData.address || "");
          console.log(parsedOrderData);
        }
        }, [setValue]);

    const onSubmit = (data: orderData) => {
        try {
            let existingOrderData = localStorage.getItem("orderData");
            let orderData;

            if (existingOrderData) {
               // Nếu có dữ liệu cũ, parse nó
                orderData = JSON.parse(existingOrderData);
            }   else {
                // Nếu không có dữ liệu cũ, tạo object mới với giá trị mặc định
                orderData = {
                  apartment: "",
                  city: "",
                  phone: "",
                };
                }

            // Cập nhật các key từ dữ liệu đầu vào
              orderData.name = data.name;
              orderData.LastName = data.LastName;
              orderData.email = data.email;
              orderData.address = data.address;
            const userData = {
                name: data.name,
                LastName: data.LastName,
                email: data.email,
                address: data.address,
            };
            localStorage.setItem("userdata", JSON.stringify(userData));
            localStorage.setItem("orderData", JSON.stringify(orderData));
            toast("Cập nhật thông tin thành công!");
            console.log(data);
        }
        catch (error) {
            handleError(errors);
        }
        // Reset the form or perform any other actions as needed
    }
    const handleError = (errors: any) => {  
        console.log(errors);
        if (errors.name) {
          setError("name", { type: "manual", message: "Tên không được để trống" });
        }
        if (errors.LastName) {
          setError("LastName", { type: "manual", message: "Họ không được để trống" });
        }
        if (errors.email) {
          setError("email", { type: "manual", message: "Email không được để trống" });
        }
        if (errors.address) {
          setError("address", { type: "manual", message: "Địa chỉ không được để trống" });
        }
      }
    

    

  return (
    <div className="flex h-screen ">
      {/* Sidebar (Manage My Account) */}
      <aside className="w-64 bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Manage My Account</h2>
        <ul className="space-y-2 ml-10">
          <li><a href="/my-profile" className="text-blue-500">My Profile</a></li>
          <li><a href="/address-book">Address Book</a></li>
          <li><a href="/payment-options">My Payment Options</a></li>
        </ul>
        <h2 className="text-lg font-semibold mt-8 mb-4">My Orders</h2>
        <ul className="space-y-2 ml-10">
          <li><a href="/my-returns">My Returns</a></li>
          <li><a href="/my-cancellations">My Cancellations</a></li>
        </ul>
        <h2 className="text-lg font-semibold mt-8 mb-4">My WishList</h2>
      </aside>

      {/* Main Content (Edit Your Profile) */}
      <main className="flex-1 p-8 ml-10 mt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Edit Your Profile</h1>
          <div className="text-sm ">Welcome! <span className="text-red-500">{user && JSON.parse(user).name}</span> </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Form Fields */}
          <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">First Name</label>
              <input type="text" placeholder="" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
              {...register('name', { required: true })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email"  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" 
              {...register('email', { required: true })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password Changes</label>
              <input type="password" placeholder="Current Password" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="New Password" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Confirm New Password" className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </form>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text"  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" 
              {...register('LastName',{ required: true })}/>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text"  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500" 
              {...register('address',{ required: true })}/>
            </div>
            <div className="flex justify-end mt-8">
              <button className="mr-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Cancel</button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                onClick={handleSubmit(onSubmit)}
                >Save Changes</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MyProfile;