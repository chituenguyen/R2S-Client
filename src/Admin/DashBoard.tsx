const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <p className="text-gray-500 text-center col-span-4">No data available</p>
      </div>
    </div>
  );
};

export default Dashboard;
