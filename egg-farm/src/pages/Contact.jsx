import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">📍</div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">📞</div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✉️</div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">info@myapp.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;