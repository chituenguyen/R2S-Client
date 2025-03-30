import React from 'react';

const Settings = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                <label className="ml-2 text-sm text-gray-700">Email notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                <label className="ml-2 text-sm text-gray-700">Push notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                <label className="ml-2 text-sm text-gray-700">Monthly reports</label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="radio" name="theme" className="h-4 w-4 text-blue-600" />
                <label className="ml-2 text-sm text-gray-700">Light</label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="theme" className="h-4 w-4 text-blue-600" />
                <label className="ml-2 text-sm text-gray-700">Dark</label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="theme" className="h-4 w-4 text-blue-600" />
                <label className="ml-2 text-sm text-gray-700">System</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;