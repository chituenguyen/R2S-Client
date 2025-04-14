import { useMutation, useQuery } from "@tanstack/react-query";
import * as product from "../../api/product";
import { Product,Dataput } from "../../redux/type";
import { useForm } from "react-hook-form";
import { useToast } from "../../components/context/ToastContext";
import { useState } from "react";
import Sidebar from "./Sidebar";


function AdminPage() {
    // const { hideLayout } = useOutletContext<{ hideLayout: boolean }>();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 7; // Số sản phẩm hiển thị trên mỗi trang
    const toast = useToast();
        const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<Dataput>();
        
        const { data, isPending, error } = useQuery({
            queryKey: ["product"],
            queryFn: () => product.getProductList(),
          });
          let sortedProducts = [];
    
          if (data) {
            sortedProducts = [...data.data].sort((a, b) => a.id - b.id); // Sắp xếp theo ID tăng dần
          }
    
         
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        const mutation = useMutation({
          mutationFn: ({ formData }: { formData: FormData }) => product.UpdateProduct(formData, "admin@gmail.com", "admin"), // Sửa mutationFn
          onSuccess: () => {
              console.log("Product updated successfully");
              toast.toast("Thay đổi thành công ");
          },
          onError: (error) => {
              console.error("Update Product Error:", error);
          }
      });
    
      const onSubmit = (data: Dataput) => {
          console.log("Form data:", data);
          const images = data.images;
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('description', data.description);
          formData.append('price', data.price);
    
          if (images && images.length > 0) {
              for (let i = 0; i < images.length; i++) {
                  formData.append('images', images[i]);
              }
          }
    
          console.log("FormData:", formData);
    
          // Gọi hàm mutation để thực hiện cập nhật sản phẩm
          mutation.mutate({ formData: formData }); // Gửi formData trực tiếp
      };
      const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
      }

    const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`px-4 py-2 mx-1 rounded ${
        currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {number}
    </button>
    ));
    function truncateDescription(description: string, maxLength: number = 50) {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }
    
      if (isPending) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto py-6 mt-[50px]">
                <h2 className="text-2xl font-semibold mb-4">Admin Panel - Product Management</h2>
            
                {/* Form thêm/sửa sản phẩm */}
                <div className="mb-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="border p-2 mr-2"
                    {...register("name", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="border p-2 mr-2"
                    {...register("price", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 mr-2"
                    {...register("description", { required: true })}
                  />
                  <input
                    type="file"
                    multiple  
                    className="border p-2 mr-2"
                    {...register("images", { required: "Please select images" })}
                  />
                  <button type="submit" className="bg-blue-500 text-white p-2">
                    Update
                  </button>
                  </form>
                </div>
            
                {/* Danh sách sản phẩm */}
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 w-[50px]" >ID</th>
                      <th className="border border-gray-300 p-2 w-[180px]">Name</th>
                      <th className="border border-gray-300 p-2 w-[100px]">Price</th>
                      <th className="border border-gray-300 p-2 w-[250px]">Description</th>
                      <th className="border border-gray-300 p-2 w-[120px]">Image URL</th>
                      <th className="border border-gray-300 p-2 w-[150px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product:Product) => (
                      <tr key={product.id}>
                        <td className="border border-gray-300 p-2">{product.id}</td>
                        <td className="border border-gray-300 p-2">{product.name}</td>
                        <td className="border border-gray-300 p-2">{product.price}</td>
                        <td className="border border-gray-300 p-2">{truncateDescription(product.description)}</td>
                        <td className="border border-gray-300 p-2"><img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]" />{product.images.length}</td>
                        
                        <td className="border border-gray-300 p-2">
                          <button
                            onClick={() => console.log("Edit product:", product.id)}
                            className="bg-yellow-500 text-white p-2 mr-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => console.log("Delete product:", product.id)}
                            className="bg-red-500 text-white p-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                        {renderPageNumbers}
                    </div>
              </div>
        </div>
    );
}

export default AdminPage;