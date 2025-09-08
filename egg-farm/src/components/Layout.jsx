import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;