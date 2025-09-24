import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import ConnectionTest from '../components/ConnectionTest';

const Home = () => {
  const { isAdmin } = useAuth();
  
  // Function to get time-based greeting for Sri Lankan time
  const getTimeBasedGreeting = () => {
    // Sri Lanka is UTC+5:30
    const now = new Date();
    const sriLankaTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const hour = sriLankaTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon!";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  // State for current greeting
  const [currentGreeting, setCurrentGreeting] = useState(getTimeBasedGreeting());
  
  const [metrics, setMetrics] = useState({
    totalBirds: 0,
    mortalityRate: 0,
    totalEggs: 0,
    totalEmployees: 0,
    loading: true
  });

  useEffect(() => {
    fetchMetrics();
    
    // Update greeting every minute
    const updateGreeting = () => {
      setCurrentGreeting(getTimeBasedGreeting());
    };
    
    // Update immediately
    updateGreeting();
    
    // Set up interval to update every minute
    const interval = setInterval(updateGreeting, 60000); // 60 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      setMetrics(prev => ({ ...prev, loading: true }));
      
      // Fetch egg production summary
      const eggSummary = await apiService.getEggProductionSummary();
      
      // Fetch sales summary
      const salesSummary = await apiService.getSalesSummary();
      
      // Fetch feed inventory summary
      const feedSummary = await apiService.getFeedInventorySummary();

      // Calculate metrics from the data
      const totalBirds = eggSummary.data?.totalRecords > 0 ? 
        eggSummary.data.totalRecords * 100 : 0; // Assuming 100 birds per record for demo
      
      const totalEggs = eggSummary.data?.totalEggs || 0;
      const totalDamagedEggs = eggSummary.data?.totalDamagedEggs || 0;
      const mortalityRate = totalBirds > 0 ? 
        ((totalDamagedEggs / totalBirds) * 100).toFixed(1) : 0;
      
      const totalEmployees = 25; // Fixed for now, can be made dynamic later

      setMetrics({
        totalBirds,
        mortalityRate: parseFloat(mortalityRate),
        totalEggs,
        totalEmployees,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setMetrics({
        totalBirds: 0,
        mortalityRate: 0,
        totalEggs: 0,
        totalEmployees: 0,
        loading: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Responsive */}
        <aside className="w-full lg:w-64 bg-white shadow-lg lg:min-h-screen">
          <div className="p-4 lg:p-6">
            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-3">
              <Link to="/egg-production" className="text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block text-sm lg:text-base">
                Egg Production Management
              </Link>
              <Link to="/sales-order" className="text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block text-sm lg:text-base">
                Sales and Order Management
              </Link>
              <Link to="/feed-inventory" className="text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block text-sm lg:text-base">
                Feed & Inventory Management
              </Link>
              <Link to="/task-scheduling" className="text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block text-sm lg:text-base">
                Task Scheduling
              </Link>
              <Link to="/financial-management" className="text-left px-4 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm block text-sm lg:text-base">
                Financial Management
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 mb-2 sm:mb-0">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{currentGreeting}</h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600">Optimize your farm operations with Real Time Insights.</p>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-2">Total Birds</h3>
                  <p className="text-2xl lg:text-3xl font-bold text-orange-500">
                    {metrics.loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                    ) : (
                      metrics.totalBirds.toLocaleString()
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-2">Mortality Rate</h3>
                  <p className="text-2xl lg:text-3xl font-bold text-red-500">
                    {metrics.loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                    ) : (
                      `${metrics.mortalityRate}%`
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-2">Number Of Eggs</h3>
                  <p className="text-2xl lg:text-3xl font-bold text-green-500">
                    {metrics.loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                    ) : (
                      metrics.totalEggs.toLocaleString()
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-2">Number Of Employees</h3>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-500">
                    {metrics.loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-8 rounded"></div>
                    ) : (
                      metrics.totalEmployees
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Test - Admin Only */}
          {isAdmin && (
            <div className="mb-6">
              <ConnectionTest />
            </div>
          )}

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Our Location */}
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Our Location</h2>
              </div>
              <p className="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4">No,222,Glahitiyawa,Kuliyapitiya</p>
              <div className="rounded-lg h-48 lg:h-64 overflow-hidden shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?q=F24W%2B3C+ABEYARATHNA+FARM,+Galahitiyawa&t=k&z=18&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Abeyarathna Farm Location"
                ></iframe>
              </div>
              <div className="mt-3 text-center">
                <a 
                  href="https://maps.google.com/?q=F24W+3C+ABEYARATHNA+FARM,+Galahitiyawa&t=k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Stats</h2>
              </div>
              <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">Statistics of different categories</p>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 hover:from-orange-200 hover:to-orange-300 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">Total Wages</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 hover:from-orange-200 hover:to-orange-300 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">Sales</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 hover:from-green-200 hover:to-green-300 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">Remaining Feed</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 hover:from-orange-200 hover:to-orange-300 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">Total Wages</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 lg:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center">
            <p className="text-sm lg:text-base text-gray-600 mb-2">Copyright © 2024 Abeyrathne Enterprises All Rights Reserved.</p>
            <div className="text-xs lg:text-sm text-gray-500 space-y-1">
              <p>No,222,Glahitiyawa,Kuliyapitiya</p>
              <p>Abeyrathne Enterprises</p>
              <p>Abeyrathne Enterprises@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;