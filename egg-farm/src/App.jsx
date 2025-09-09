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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/egg-production" element={<EggProduction />} />
        <Route path="/sales-order" element={<SalesOrder />} />
        <Route path="/feed-inventory" element={<FeedInventory />} />
        <Route path="/task-scheduling" element={<TaskScheduling />} />
        <Route path="/financial-management" element={<FinancialManagement />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;