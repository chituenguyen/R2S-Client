import Sidebar from "./Sidebar";
import * as Product from "../../api/product";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const Order: React.FC = () => {
    const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const { data, isPending, error } = useQuery({
    queryKey: ['orders'], 
    queryFn: () => Product.AllOrder(),
});
  console.log("data", data);


const mutate = useMutation({
  mutationFn: ({ id, status }: { id: number, status: string }) => Product.ChangeStatus(id, status),
    onSuccess: () => {
      console.log("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ['orders'] }); // Làm mới dữ liệu
    },
    onError: (err: any) => {
      console.error("Update Product Error:", err);
      alert("Update product error");
    },
  });
  

  // Removed unused destructured variables
  const onSubmit = (id: number) => {
    console.log("id", id)
    mutate.mutate({ id, status: "done" });
};

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
// const orders = [
//     {
//       id: 1,
//       user_id: 8,
//       name: 'Le Huu Anh Quan',
//       address: '497 Hoa Hao, Ho Chi Minh City',
//       total_amount: '119.98',
//       status: 'done',
//       created_at: '2025-03-29T12:05:56.722Z',
//       updated_at: '2025-03-29T12:05:56.722Z',
//     },
//     // ... thêm các đối tượng đơn hàng khác nếu cần ...
//   ];
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(data.length / productsPerPage);
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
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="max-w-screen-xl mx-auto py-6 mt-[50px]">
        <h1 className="text-2xl font-semibold mb-4">Đơn hàng của bạn</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 w-[50px]">ID</th>
              <th className="border border-gray-300 p-2 w-[180px]">Tên người nhận</th>
              <th className="border border-gray-300 p-2 w-[200px]">Địa chỉ</th>
              <th className="border border-gray-300 p-2 w-[250px]">Tổng tiền</th>
              <th className="border border-gray-300 p-2 w-[120px]">Trạng thái</th>
              <th className="border border-gray-300 p-2 w-[150px]">Ngày tạo</th>
              <th className="border border-gray-300 p-2 w-[100px]">Updated</th>
            </tr>
          </thead>
          <tbody>
              {currentProducts.map((order:any) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 p-2">{order.id}</td>
                  <td className="border border-gray-300 p-2">{order.name}</td>
                  <td className="border border-gray-300 p-2">{order.address}</td>
                  <td className="border border-gray-300 p-2">{order.total_amount}</td>
                  <td className="border border-gray-300 p-2">{order.status}</td>
                  <td className="border border-gray-300 p-2">{order.created_at}</td>
                  <td className="border border-gray-300 p-2  ">
                  {order.status !== 'done' && (
                      <button className="bg-green-500 w-[50px] h-[30px]"
                      onClick={() => onSubmit(order.id)}>
                      done
                      </button>
                      )}
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
  };

export default Order;