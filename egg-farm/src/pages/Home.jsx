import { Link } from 'react-router-dom';

const Home = () => {
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
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">Good Morning!</h1>
                <p className="text-xl text-gray-600">Optimize your farm operations with Real Time Insights.</p>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Birds</h3>
                  <p className="text-3xl font-bold text-orange-500">1500</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Mortality Rate</h3>
                  <p className="text-3xl font-bold text-red-500">26%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Number Of Eggs</h3>
                  <p className="text-3xl font-bold text-green-500">9000</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Number Of Employees</h3>
                  <p className="text-3xl font-bold text-blue-500">25</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Location */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Location</h2>
              </div>
              <p className="text-gray-600 mb-4">No,222,Glahitiyawa,Kuliyapitiya</p>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-3 animate-pulse shadow-lg"></div>
                  <p className="text-sm text-gray-700 font-medium">Map View</p>
                  <p className="text-xs text-gray-600 mt-1">ABEYARATHNA FARM</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Stats</h2>
              </div>
              <p className="text-gray-600 mb-6">Statistics of different categories</p>
              <div className="grid grid-cols-2 gap-4">
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
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Copyright © 2024 Abeyrathne Enterprises All Rights Reserved.</p>
            <div className="text-sm text-gray-500 space-y-1">
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