import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query" 
import { Check, X } from "lucide-react" 
import { Order } from "../redux/types/user.types" 

const API_URL = "https://devapi.uniscore.vn/uri/api/orders" // URL API để lấy và cập nhật đơn hàng

// Hàm lấy dữ liệu đơn hàng từ API
const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(API_URL) // Gửi yêu cầu GET đến API
  if (!response.ok) {
    throw new Error("Failed to fetch orders") 
  }
  return response.json() // Trả về dữ liệu đơn hàng dưới dạng JSON
}

// Hàm cập nhật trạng thái đơn hàng
const updateOrderStatus = async ({
  orderId,
  status
}: {
  orderId: number
  status: string
}): Promise<Order> => {
  const response = await fetch(`${API_URL}/${orderId}`, {
    method: "PUT", // Sử dụng PUT để cập nhật
    headers: {
      "Content-Type": "application/json" // Đảm bảo gửi dữ liệu ở định dạng JSON
    },
    body: JSON.stringify({ status }) // Truyền trạng thái mới
  })

  if (!response.ok) {
    throw new Error("Failed to update order status") // Nếu không thành công, ném lỗi
  }
  return response.json() // Trả về đơn hàng đã cập nhật trạng thái
}

const Orders = () => {
  const queryClient = useQueryClient() // Hook để quản lý cache và invalidation của react-query
  const {
    data: orders = [], // Lấy danh sách đơn hàng từ API
    isLoading, // Trạng thái tải dữ liệu
    error // Lỗi nếu có trong quá trình tải dữ liệu
  } = useQuery({ queryKey: ["orders"], queryFn: fetchOrders }) // Sử dụng useQuery để lấy dữ liệu đơn hàng

  // Mutation để cập nhật trạng thái đơn hàng
  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatus, // Hàm cập nhật trạng thái đơn hàng
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }) // Khi cập nhật thành công, invalidates cache để lấy dữ liệu mới
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
        {isLoading && <p className="text-gray-500">Loading orders...</p>} {/* Hiển thị khi đang tải dữ liệu */}
        {error && <p className="text-red-500">Error loading orders</p>} {/* Hiển thị khi có lỗi xảy ra */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-100 transition" // Cải thiện giao diện với hiệu ứng hover
                >
                  <td className="p-3">#{order.id}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">
                    ${parseFloat(order.total_amount).toFixed(2)} {/* Hiển thị tổng số tiền đơn hàng */}
                  </td>
                  <td className="p-3">
                    {/* Hiển thị trạng thái đơn hàng với màu sắc tương ứng */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status.toLowerCase() === "done"
                          ? "bg-green-500 text-white" // Nếu trạng thái là "done", hiển thị màu xanh
                          : order.status.toLowerCase() === "pending"
                          ? "bg-yellow-500 text-white" // Nếu trạng thái là "pending", hiển thị màu vàng
                          : "bg-gray-500 text-white" // Nếu trạng thái khác, hiển thị màu xám
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleString()} {/* Hiển thị thời gian tạo đơn hàng */}
                  </td>
                  <td className="p-3">
                    {/* Tùy thuộc vào trạng thái, hiển thị nút để cập nhật trạng thái */}
                    {order.status.toLowerCase() === "pending" ? (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            orderId: order.id,
                            status: "done" // Cập nhật trạng thái thành "done"
                          })
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                      >
                        <Check size={16} /> Mark Done {/* Biểu tượng và văn bản "Mark Done" */}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            orderId: order.id,
                            status: "pending" // Cập nhật trạng thái về "pending"
                          })
                        }
                        className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        <X size={16} /> {/* Biểu tượng "X" */}
                        <span>Revert to Pending</span> {/* Văn bản "Revert to Pending" */}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
