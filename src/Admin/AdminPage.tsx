import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom'; 
import {
  LayoutDashboard,
  Users as UsersIcon,
  ShoppingCart,
  Settings as SettingsIcon,
  Bell,
  Search,
  Package,
  ChevronLeft
} from 'lucide-react'; 

function Adminpage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Quản lý trạng thái mở/đóng của sidebar
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Danh sách các item trong sidebar
  const navItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/admin' },
    { icon: <UsersIcon />, label: 'Users', path: '/admin/users' },
    { icon: <ShoppingCart />, label: 'Orders', path: '/admin/orders' },
    { icon: <Package />, label: 'Products', path: '/admin/products' },
    { icon: <SettingsIcon />, label: 'Setting', path: '/admin/setting' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        {/* Tiêu đề và nút mở/đóng Sidebar */}
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Navigation</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Mở hoặc đóng Sidebar" title="Mở hoặc đóng Sidebar">
            {/* Nút để mở hoặc đóng sidebar */}
            <ChevronLeft className={`transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>
        {/* Menu điều hướng */}
        <nav className="mt-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path} // Liên kết tới các trang tương ứng
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {item.icon} {/* Hiển thị biểu tượng của item */}
              <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.label}</span> {/* Hiển thị nhãn khi sidebar mở */}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
              <Search className="text-gray-400" /> {/* Icon tìm kiếm */}
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none flex-1"
              />
            </div>
            {/* Thông báo và thông tin người dùng */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Thông báo" title="Thông báo">
                <Bell /> {/* Icon thông báo */}
                {/* Chấm đỏ biểu thị có thông báo mới */}
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                {/* Hình ảnh và tên người dùng */}
                <img
                  src="/assets/images.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Admin</span> {/* Tên người dùng */}
              </div>
            </div>
          </div>
        </header>
        {/* Nội dung trang con sẽ được render tại đây */}
        <div className="p-6">
          <Outlet /> {/* React Router Outlet để render các nội dung của các trang con */}
        </div>
      </main>
    </div>
  );
}

export default Adminpage;
