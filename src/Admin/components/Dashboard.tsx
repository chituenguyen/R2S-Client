import React from 'react';
import { Users, DollarSign, ShoppingBag, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: "+12.5%",
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Active Users",
      value: "2,435",
      change: "+5.2%",
      isPositive: true,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Sales",
      value: "1,235",
      change: "-2.4%",
      isPositive: false,
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      title: "Conversion Rate",
      value: "3.12%",
      change: "+1.2%",
      isPositive: true,
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                {stat.icon}
              </div>
              <span className={`flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;