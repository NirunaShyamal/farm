import { Link } from 'react-router-dom';
import { useState } from 'react';

const SalesOrder = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Smith', product: 'Fresh Eggs', quantity: 50, price: 250.00, status: 'Pending', date: '2024-01-15' },
    { id: 2, customer: 'Mary Johnson', product: 'Organic Eggs', quantity: 30, price: 180.00, status: 'Completed', date: '2024-01-14' },
    { id: 3, customer: 'David Brown', product: 'Free Range Eggs', quantity: 75, price: 375.00, status: 'Processing', date: '2024-01-13' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    quantity: '',
    price: '',
    status: 'Pending'
  });

  const handleCreate = () => {
    setEditingOrder(null);
    setFormData({ customer: '', product: '', quantity: '', price: '', status: 'Pending' });
    setShowModal(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData(order);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrder) {
      // Update existing order
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...formData, id: editingOrder.id, date: editingOrder.date }
          : order
      ));
    } else {
      // Create new order
      const newOrder = {
        ...formData,
        id: orders.length + 1,
        date: new Date().toISOString().split('T')[0]
      };
      setOrders([...orders, newOrder]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <Link to="/sales-order" className="w-full text-left px-4 py-3 bg-orange-100 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition-colors shadow-sm block">
                Sales and Order Management
              </Link>
                          <Link to="/feed-inventory" className="w-full text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Sales and Order Management</h1>
            </div>
            <p className="text-gray-600">Manage your sales orders, customers, and inventory efficiently</p>
          </div>

          {/* Management Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Product Catalog */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product Catalog</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Add / Edit / Delete Products</li>
                <li>• Category Filtering</li>
                <li>• Price Management</li>
                <li>• Stock Tracking</li>
              </ul>
            </div>

            {/* Customer Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Management</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Customer Database</li>
                <li>• Contact Information</li>
                <li>• Order History</li>
                <li>• Customer Analytics</li>
              </ul>
            </div>

            {/* Order Placement */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Placement</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Create New Orders</li>
                <li>• Edit Orders</li>
                <li>• Order Tracking</li>
                <li>• Status Updates</li>
              </ul>
            </div>

            {/* Stock Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Management</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stock Deduction Processing</li>
                <li>• Inventory Levels</li>
                <li>• Low Stock Alerts</li>
                <li>• Reorder Points</li>
              </ul>
            </div>

            {/* Invoice & Payment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice & Payment</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Generate Invoices</li>
                <li>• Payment Tracking</li>
                <li>• Payment Methods</li>
                <li>• Outstanding Payments</li>
              </ul>
            </div>

            {/* Sales Reports */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Sales Analytics</li>
                <li>• Revenue Reports</li>
                <li>• Customer Insights</li>
                <li>• Performance Metrics</li>
              </ul>
            </div>
          </div>

          {/* Orders Management Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
              <button 
                onClick={handleCreate}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Order
              </button>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(order)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Order"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Order"
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
        </main>

        {/* Notifications Panel */}
        <aside className="w-80 bg-white shadow-lg min-h-screen p-6">
          <h2 className="text-xl font-bold text-orange-500 mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-red-600">Organic Eggs - 15 units remaining</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 font-medium">Pending Order Reminders</p>
                  <p className="text-sm text-yellow-600">3 orders awaiting confirmation</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">Order Ready for Dispatch</p>
                  <p className="text-sm text-green-600">Order #2 ready for pickup</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingOrder ? 'Edit Order' : 'Create New Order'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Product</option>
                    <option value="Fresh Eggs">Fresh Eggs</option>
                    <option value="Organic Eggs">Organic Eggs</option>
                    <option value="Free Range Eggs">Free Range Eggs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
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
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
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
                    {editingOrder ? 'Update' : 'Create'}
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
              <p>No.222,Glahitlyawa,Kuliyapitiya</p>
              <p>Abeyrathne Enterprises</p>
              <p>Abeyrathne Enterprises@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesOrder;
