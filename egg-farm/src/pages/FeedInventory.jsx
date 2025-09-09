import { Link } from 'react-router-dom';
import { useState } from 'react';

const FeedInventory = () => {
  const [feedStock, setFeedStock] = useState([
    { id: 1, feedType: 'Layer Feed', quantity: 250, supplier: 'ABC', lastRestocked: '2025-08-01', expiredDate: '2026-08-11' },
    { id: 2, feedType: 'Chick Starter', quantity: 120, supplier: 'XYZ', lastRestocked: '2025-08-07', expiredDate: '2026-08-07' },
    { id: 3, feedType: 'Broiler Feed', quantity: 180, supplier: 'DEF', lastRestocked: '2025-08-05', expiredDate: '2026-08-15' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [formData, setFormData] = useState({
    feedType: '',
    quantity: '',
    supplier: '',
    lastRestocked: '',
    expiredDate: ''
  });

  const handleCreate = () => {
    setEditingStock(null);
    setFormData({ feedType: '', quantity: '', supplier: '', lastRestocked: '', expiredDate: '' });
    setShowModal(true);
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
    setFormData(stock);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feed stock?')) {
      setFeedStock(feedStock.filter(stock => stock.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStock) {
      // Update existing stock
      setFeedStock(feedStock.map(stock => 
        stock.id === editingStock.id 
          ? { ...formData, id: editingStock.id }
          : stock
      ));
    } else {
      // Create new stock
      const newStock = {
        ...formData,
        id: feedStock.length + 1
      };
      setFeedStock([...feedStock, newStock]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calculate summary metrics
  const totalFeedStock = feedStock.reduce((sum, stock) => sum + parseInt(stock.quantity), 0);
  const feedConsumedToday = 300; // This could be dynamic
  const daysFeedWillLast = Math.floor(totalFeedStock / feedConsumedToday);
  const lowStockItems = feedStock.filter(stock => stock.quantity < 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <nav className="space-y-3">
              <Link to="/egg-production" className="w-full text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block">
                Egg Production Management
              </Link>
              <Link to="/sales-order" className="w-full text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block">
                Sales and Order Management
              </Link>
                          <Link to="/feed-inventory" className="w-full text-left px-4 py-3 bg-orange-100 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition-colors shadow-sm block">
                            Feed & Inventory Management
                          </Link>
                          <Link to="/task-scheduling" className="w-full text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block">
                            Task Scheduling
                          </Link>
                          <Link to="/financial-management" className="w-full text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block">
                            Financial Management
                          </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">FEED & INVENTORY MANAGEMENT</h1>
            </div>
            <p className="text-gray-600">Manage your feed stock, inventory levels, and supplier information efficiently</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Feed Stock (KG)</h3>
                  <p className="text-3xl font-bold text-orange-500">{totalFeedStock}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Feed Consumed Today (KG)</h3>
                  <p className="text-3xl font-bold text-blue-500">{feedConsumedToday}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Days Feed Will Last</h3>
                  <p className="text-3xl font-bold text-green-500">{daysFeedWillLast}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock Alert</h3>
                  <p className="text-3xl font-bold text-red-500">{lowStockItems.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Stock Management Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Feed Stock Details</h2>
              <div className="flex gap-3">
                <button 
                  onClick={handleCreate}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Feed Stock
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Stock
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </button>
              </div>
            </div>

            {/* Feed Stock Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Available (Kg)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedStock.map((stock) => (
                    <tr key={stock.id} className={stock.quantity < 100 ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.feedType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          stock.quantity < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {stock.quantity} KG
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.lastRestocked}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.expiredDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(stock)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Stock"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(stock.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Stock"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-orange-500 mb-4">Notifications</h2>
            <div className="space-y-4">
              {lowStockItems.length > 0 ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">Low Stock Warning</p>
                      <p className="text-sm text-red-600">
                        {lowStockItems.map(item => `${item.feedType} (${item.quantity} KG)`).join(', ')} - Running low on stock
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-green-700 font-medium">Stock Status</p>
                      <p className="text-sm text-green-600">All feed stocks are at healthy levels</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-medium">Expire Feed Alerts</p>
                    <p className="text-sm text-yellow-600">Check expiration dates for all feed types</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingStock ? 'Edit Feed Stock' : 'Add New Feed Stock'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Feed Type</label>
                  <select
                    name="feedType"
                    value={formData.feedType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Feed Type</option>
                    <option value="Layer Feed">Layer Feed</option>
                    <option value="Chick Starter">Chick Starter</option>
                    <option value="Broiler Feed">Broiler Feed</option>
                    <option value="Grower Feed">Grower Feed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity (KG)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Restocked</label>
                  <input
                    type="date"
                    name="lastRestocked"
                    value={formData.lastRestocked}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expired Date</label>
                  <input
                    type="date"
                    name="expiredDate"
                    value={formData.expiredDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
                  >
                    {editingStock ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Copyright © 2024 Abeyrathne Enterprises All Rights Reserved.</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>No.222,Glahityawa,Kuliyapitiya</p>
              <p>Abeyrathne Enterprises</p>
              <p>Abeyrathne Enterprises@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeedInventory;
