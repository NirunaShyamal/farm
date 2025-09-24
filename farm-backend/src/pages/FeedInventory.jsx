import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FeedInventory = () => {
  // Main state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [feedStock, setFeedStock] = useState([]);
  const [feedUsage, setFeedUsage] = useState([]);
  const [analytics, setAnalytics] = useState({});

  // Modal states
  const [showStockModal, setShowStockModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [stockForm, setStockForm] = useState({
    feedType: 'Layer Feed',
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
    year: new Date().getFullYear(),
    baselineQuantity: '',
    supplier: '',
    supplierContact: '',
    costPerUnit: '',
    minimumThreshold: 100,
    expiryDate: '',
    location: 'Main Storage',
    batchNumber: '',
    deliveryDate: '',
    qualityGrade: 'A',
    notes: ''
  });

  const [usageForm, setUsageForm] = useState({
    feedType: 'Layer Feed',
    date: new Date().toISOString().split('T')[0],
    quantityUsed: '',
    recordedBy: ''
  });

  // API Base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
    fetchFeedStock();
    fetchFeedUsage();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Add cache busting timestamp to force fresh dashboard data
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/feed-stock/dashboard?_t=${timestamp}`, {
        cache: 'no-cache'
      });
      const data = await response.json();
      console.log('📊 Fetched dashboard data:', data); // Debug log
      if (data.success) {
        setDashboardData(data.data);
        console.log('✅ Updated dashboard state:', data.data); // Debug log
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchFeedStock = async () => {
    try {
      // Add cache busting timestamp to force fresh data
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/feed-stock?status=all&_t=${timestamp}`, {
        cache: 'no-cache'
      });
      const data = await response.json();
      console.log('📊 Fetched feed stock data:', data); // Debug log
      if (data.success) {
        setFeedStock(data.data);
        console.log('✅ Updated feedStock state with', data.data.length, 'items'); // Debug log
      }
    } catch (error) {
      console.error('Error fetching feed stock:', error);
    }
  };

  const fetchFeedUsage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feed-usage?limit=20`);
      const data = await response.json();
      if (data.success) {
        setFeedUsage(data.data);
      }
    } catch (error) {
      console.error('Error fetching feed usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feed-usage/analytics`);
      const data = await response.json();
        if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  // Handle stock form submission
  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('📝 Submitting stock data:', stockForm); // Debug log
      const response = await fetch(`${API_BASE_URL}/feed-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockForm)
      });
      const data = await response.json();
      console.log('📋 Server response:', data); // Debug log
      
      if (data.success) {
        console.log('✅ Stock submission successful, refreshing data...'); // Debug log
        setShowStockModal(false);
        
        // Wait a moment then refresh data
        setTimeout(async () => {
          console.log('🔄 Starting data refresh...'); // Debug log
          await Promise.all([
            fetchDashboardData(),
            fetchFeedStock()
          ]);
          console.log('🔄 Data refresh completed'); // Debug log
        }, 800); // Slightly longer delay to ensure database write completes
        
        alert('Feed stock updated successfully!');
        
        // Reset form
        setStockForm({
          feedType: 'Layer Feed',
          month: new Date().toISOString().slice(0, 7),
          year: new Date().getFullYear(),
          baselineQuantity: '',
      supplier: '',
      supplierContact: '',
      costPerUnit: '',
      minimumThreshold: 100,
          expiryDate: (() => {
            const date = new Date();
            date.setMonth(date.getMonth() + 6);
            return date.toISOString().split('T')[0];
          })(),
      location: 'Main Storage',
          batchNumber: '',
          deliveryDate: '',
          qualityGrade: 'A',
      notes: ''
    });
      } else {
        console.error('❌ Stock submission failed:', data.message); // Debug log
        alert(data.message || 'Error updating stock');
        }
      } catch (error) {
      console.error('Error submitting stock:', error);
      alert('Error submitting stock data');
    }
  };

  // Handle usage form submission
  const handleUsageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/feed-usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usageForm)
      });
      const data = await response.json();
        if (data.success) {
        setShowUsageModal(false);
        fetchDashboardData();
        fetchFeedUsage();
        alert('Feed usage recorded successfully!');
      } else {
        alert(data.message || 'Error recording usage');
        }
    } catch (error) {
      console.error('Error submitting usage:', error);
      alert('Error submitting usage data');
    }
  };

  const handleStockInputChange = (e) => {
    const { name, value } = e.target;
    setStockForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUsageInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUsageForm(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setUsageForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const openStockModal = () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 6); // 6 months from now
    
    setStockForm({
      ...stockForm,
      month: new Date().toISOString().slice(0, 7),
      year: new Date().getFullYear(),
      expiryDate: futureDate.toISOString().split('T')[0] // Set default to 6 months from now
    });
    setShowStockModal(true);
  };

  const openUsageModal = () => {
    setUsageForm({
      ...usageForm,
      date: new Date().toISOString().split('T')[0]
    });
    setShowUsageModal(true);
  };

  const viewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Depleted': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevelColor = (current, threshold) => {
    if (current <= threshold * 0.5) return 'text-red-600 font-bold';
    if (current <= threshold) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  const getDaysRemainingColor = (days) => {
    if (days <= 7) return 'text-red-600 font-bold';
    if (days <= 14) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Feed Management System...</p>
        </div>
      </div>
    );
  }

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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
                  <h1 className="text-3xl font-bold text-gray-900">Advanced Feed Management</h1>
            </div>
                <p className="text-gray-600">Smart feed inventory with usage tracking and analytics</p>
          </div>

              <div className="flex gap-3">
                <button 
                  onClick={openStockModal}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Update Stock
                </button>
                <button 
                  onClick={openUsageModal}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Daily Usage
                </button>
                <button 
                  onClick={() => alert('Flock Health Log feature coming soon! This will be used for detailed weekly health and environmental observations.')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Health Log
                </button>
                </div>
              </div>
            </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'stock', name: 'Stock Management', icon: '📦' },
                { id: 'usage', name: 'Usage Records', icon: '📝' },
                { id: 'analytics', name: 'Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'analytics') fetchAnalytics();
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
                </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Stock</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {dashboardData.summary?.totalStock?.toLocaleString() || 0} KG
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {dashboardData.summary?.overallDaysRemaining || 0} days remaining
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(dashboardData.summary?.totalValue || 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Current inventory value</p>
              </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Daily Consumption</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {dashboardData.summary?.totalDailyConsumption?.toFixed(1) || 0} KG
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Average per day</p>
            </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Active Stock Types</h3>
                  <p className="text-3xl font-bold text-orange-600">
                    {dashboardData.summary?.activeStockTypes || 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Feed varieties</p>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Low Stock Alerts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                    Low Stock ({dashboardData.summary?.lowStockItems || 0})
                  </h3>
                  <div className="space-y-2">
                    {dashboardData.alerts?.lowStock?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm font-medium">{item.feedType}</span>
                        <span className="text-sm text-red-600">{item.currentQuantity} KG</span>
                </div>
                    ))}
              </div>
            </div>

                {/* Critical Stock Alerts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Critical ({dashboardData.summary?.criticalItems || 0})
                  </h3>
                  <div className="space-y-2">
                    {dashboardData.alerts?.critical?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-red-100 rounded">
                        <span className="text-sm font-medium">{item.feedType}</span>
                        <span className="text-sm text-red-800 font-bold">{item.currentQuantity} KG</span>
                </div>
                    ))}
                  </div>
                </div>

                {/* Expiring Items */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-yellow-600 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                    Expiring Soon ({dashboardData.summary?.expiringItems || 0})
                  </h3>
                  <div className="space-y-2">
                    {dashboardData.alerts?.expiring?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm font-medium">{item.feedType}</span>
                        <span className="text-sm text-yellow-600">{item.expiryDate}</span>
                </div>
                    ))}
              </div>
            </div>
          </div>

              {/* Inventory by Type */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory by Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dashboardData.inventoryByType?.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{item.feedType}</h4>
                        <span className="text-sm text-gray-500">{item.percentage}%</span>
              </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Quantity:</span>
                          <span className="font-medium">{item.quantity} KG</span>
            </div>
                        <div className="flex justify-between text-sm">
                          <span>Value:</span>
                          <span className="font-medium">{formatCurrency(item.value)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Days Left:</span>
                          <span className={`font-medium ${getDaysRemainingColor(item.daysRemaining)}`}>
                            {item.daysRemaining} days
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stock Management Tab */}
          {activeTab === 'stock' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Stock Levels</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                      {feedStock.map((stock) => (
                        <tr key={stock._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{stock.feedType}</div>
                            </div>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <span className={`font-semibold ${getStockLevelColor(stock.currentQuantity, stock.minimumThreshold)}`}>
                                {stock.currentQuantity} KG
                              </span>
                              <div className="text-xs text-gray-500">
                                Threshold: {stock.minimumThreshold} KG
                              </div>
                            </div>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getDaysRemainingColor(stock.daysUntilExpiry || 0)}`}>
                              {stock.daysUntilExpiry || 0} days
                            </span>
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stock.supplier}
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stock.expiryDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(stock.status)}`}>
                              {stock.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => viewDetails(stock)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              View Details
                            </button>
                        </td>
                      </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
                          </div>
          )}

          {/* Usage Records Tab */}
          {activeTab === 'usage' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Usage Records</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Used</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birds</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recorded By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {feedUsage.map((usage) => (
                        <tr key={usage._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {usage.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {usage.feedType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {usage.quantityUsed} KG
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {usage.totalBirds}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {usage.feedPerBird} KG/bird
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {usage.recordedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              usage.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {usage.verified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
                    </div>
                  </div>
                </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feed Analytics Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-600">Total Usage (30 days)</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {analytics.summary?.totalUsage?.toLocaleString() || 0} KG
                      </p>
                    </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-600">Total Cost</h4>
                    <p className="text-2xl font-bold text-green-700">
                      {formatCurrency(analytics.summary?.totalCost || 0)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-600">Avg Daily Usage</h4>
                    <p className="text-2xl font-bold text-purple-700">
                      {analytics.summary?.averageDailyUsage?.toFixed(1) || 0} KG
                    </p>
                </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-600">Total Records</h4>
                    <p className="text-2xl font-bold text-orange-700">
                      {analytics.summary?.totalRecords || 0}
                    </p>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-gray-500">📈 Advanced analytics charts and insights coming soon...</p>
                  <p className="text-sm text-gray-400 mt-2">Consumption trends, efficiency metrics, and predictive analytics</p>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>

      {/* Stock Update Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Update Monthly Feed Stock</h3>
              <form onSubmit={handleStockSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Feed Type</label>
                  <select
                    name="feedType"
                    value={stockForm.feedType}
                    onChange={handleStockInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="Layer Feed">Layer Feed</option>
                    <option value="Chick Starter">Chick Starter</option>
                    <option value="Grower Feed">Grower Feed</option>
                    <option value="Medicated Feed">Medicated Feed</option>
                    <option value="Organic Feed">Organic Feed</option>
                    <option value="Finisher Feed">Finisher Feed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Month</label>
                  <input
                    type="month"
                    name="month"
                    value={stockForm.month}
                    onChange={handleStockInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Baseline Quantity (KG)</label>
                  <input
                    type="number"
                    name="baselineQuantity"
                    value={stockForm.baselineQuantity}
                    onChange={handleStockInputChange}
                    placeholder="e.g., 1000"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={stockForm.supplier}
                    onChange={handleStockInputChange}
                    placeholder="Supplier Name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost Per Unit (LKR)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="costPerUnit"
                    value={stockForm.costPerUnit}
                    onChange={handleStockInputChange}
                    placeholder="e.g., 150.00"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={stockForm.expiryDate}
                    onChange={handleStockInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Threshold (KG)</label>
                  <input
                    type="number"
                    name="minimumThreshold"
                    value={stockForm.minimumThreshold}
                    onChange={handleStockInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Quality Grade</label>
                  <select
                    name="qualityGrade"
                    value={stockForm.qualityGrade}
                    onChange={handleStockInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="A">Grade A</option>
                    <option value="B">Grade B</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={stockForm.notes}
                    onChange={handleStockInputChange}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Any additional notes..."
                  />
                </div>

                <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStockModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
                  >
                    Update Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Simple Daily Usage Recording Modal */}
      {showUsageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Daily Feed Usage</h3>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                <p className="text-sm text-blue-700">
                  📝 <strong>Quick Daily Recording</strong> - Only essential fields for everyday use
                  </p>
                </div>

              <form onSubmit={handleUsageSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feed Type</label>
                  <select
                    name="feedType"
                    value={usageForm.feedType}
                    onChange={handleUsageInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="Layer Feed">Layer Feed</option>
                    <option value="Chick Starter">Chick Starter</option>
                    <option value="Grower Feed">Grower Feed</option>
                    <option value="Medicated Feed">Medicated Feed</option>
                    <option value="Organic Feed">Organic Feed</option>
                    <option value="Finisher Feed">Finisher Feed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={usageForm.date}
                    onChange={handleUsageInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Used (KG)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="quantityUsed"
                    value={usageForm.quantityUsed}
                    onChange={handleUsageInputChange}
                    placeholder="e.g., 50.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the total amount of feed used today</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recorded By</label>
                  <input
                    type="text"
                    name="recordedBy"
                    value={usageForm.recordedBy}
                    onChange={handleUsageInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-700">
                    💡 <strong>Need to record health or environmental data?</strong><br/>
                    Use the separate "Flock Health Log" for detailed observations (weekly or as needed).
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUsageModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Record Usage
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Stock Details - {selectedItem.feedType}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Stock Information</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Quantity:</span>
                        <span className="font-medium">{selectedItem.currentQuantity} KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Baseline Quantity:</span>
                        <span className="font-medium">{selectedItem.baselineQuantity} KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum Threshold:</span>
                        <span className="font-medium">{selectedItem.minimumThreshold} KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days Remaining:</span>
                        <span className={`font-medium ${getDaysRemainingColor(selectedItem.daysRemaining)}`}>
                          {selectedItem.daysRemaining || 0} days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700">Supplier Information</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Supplier:</span>
                        <span className="font-medium">{selectedItem.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact:</span>
                        <span className="font-medium">{selectedItem.supplierContact || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Date:</span>
                        <span className="font-medium">{selectedItem.deliveryDate || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Quality & Cost</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Quality Grade:</span>
                        <span className="font-medium">Grade {selectedItem.qualityGrade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Per Unit:</span>
                        <span className="font-medium">{formatCurrency(selectedItem.costPerUnit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cost:</span>
                        <span className="font-medium">{formatCurrency(selectedItem.totalCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expiry Date:</span>
                        <span className="font-medium">{selectedItem.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700">Consumption</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Avg Daily Consumption:</span>
                        <span className="font-medium">
                          {selectedItem.averageDailyConsumption?.toFixed(1) || 0} KG
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`font-medium px-2 py-1 rounded text-xs ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedItem.notes && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-700">Notes</h4>
                    <p className="mt-2 text-sm text-gray-600">{selectedItem.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  Close
                </button>
              </div>
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
              <p>No.222,Glahitiyawa,Kuliyapitiya</p>
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