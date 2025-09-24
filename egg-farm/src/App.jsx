import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EggProduction from './pages/EggProduction';
import SalesOrder from './pages/SalesOrder';
import FeedInventory from './pages/FeedInventory';
import TaskScheduling from './pages/TaskScheduling';
import FinancialManagement from './pages/FinancialManagement';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Routes>
      {/* Auth pages without layout */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      
      {/* Main app pages with layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/egg-production" element={<Layout><EggProduction /></Layout>} />
      <Route path="/sales-order" element={<Layout><SalesOrder /></Layout>} />
      <Route path="/feed-inventory" element={<Layout><FeedInventory /></Layout>} />
      <Route path="/task-scheduling" element={<Layout><TaskScheduling /></Layout>} />
      <Route path="/financial-management" element={<Layout><FinancialManagement /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/user-management" element={<Layout><UserManagement /></Layout>} />
      <Route path="/search" element={<Layout><SearchResults /></Layout>} />
    </Routes>
  );
}

export default App;