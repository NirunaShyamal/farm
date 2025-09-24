import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4 lg:py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm lg:text-base">&copy; 2023 MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;