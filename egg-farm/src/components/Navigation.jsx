import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">MyApp</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link 
              to="/" 
              className={`py-2 px-3 rounded transition ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`py-2 px-3 rounded transition ${location.pathname === '/about' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`py-2 px-3 rounded transition ${location.pathname === '/services' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`py-2 px-3 rounded transition ${location.pathname === '/contact' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
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
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded transition ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-4 rounded transition ${location.pathname === '/about' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`block py-2 px-4 rounded transition ${location.pathname === '/services' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 px-4 rounded transition ${location.pathname === '/contact' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;