import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </div>
            <div className="ml-3">
              <Link to="/" className="text-xl font-bold text-gray-900">Abeyrathne Enterprises</Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation and Auth Buttons */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/products" 
                className={`font-medium transition ${location.pathname === '/products' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition ${location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition ${location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Contact
              </Link>
            </nav>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
              Sign in
            </button>
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
              Register
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="pt-4 space-y-2">
              <Link 
                to="/products" 
                className={`block py-2 px-4 rounded transition ${location.pathname === '/products' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`block py-2 px-4 rounded transition ${location.pathname === '/about' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block py-2 px-4 rounded transition ${location.pathname === '/contact' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;