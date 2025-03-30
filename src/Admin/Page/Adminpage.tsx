import React, { useState } from 'react';
import {Outlet,  Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users as UsersIcon,
  ShoppingCart,
  Settings as SettingsIcon,
  Bell,
  Search,
  ChevronDown,
  Package
} from 'lucide-react';


function Adminpage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
  { icon: <LayoutDashboard />, label: 'Dashboard', path: '/admin' },
  { icon: <UsersIcon />, label: 'Users', path: '/admin/users' },
  { icon: <ShoppingCart />, label: 'Orders', path: '/admin/orders' },
  { icon: <Package />, label: 'Products', path: '/admin/products' },
  { icon: <SettingsIcon />, label: 'Settings', path: '/admin/settings' }
];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronDown className={`transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {item.icon}
              <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>
        {/* Render nội dung trang con */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Adminpage;