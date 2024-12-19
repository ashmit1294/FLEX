import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center p-2 bg-transparent shadow-md'>
      <div className="flex items-center justify-between">
        <img 
          src="/logo.png" 
          alt="Company Logo" 
          className="h-10 w-auto"
        />
        <h1 className="ml-3 text-xl font-bold">FLEX</h1>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img 
            src="/profile-placeholder.jpg" 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-semibold">John Doe</span>
        </div>
        <Link 
          to="/logout" 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
