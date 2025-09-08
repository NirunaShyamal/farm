const Home = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Our Website</h1>
        <p className="text-gray-700 mb-4">This is the home page of our React application with multiple pages.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Feature One</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Feature Two</h2>
          <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Feature Three</h2>
          <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;