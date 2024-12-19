import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center p-2 bg-transparent shadow-md'>
      <div className="flex items-center justify-between">
        <img 
          src="./logo1.png" 
          alt="Company Logo" 
          className="h-10 w-20"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-2"
          />
          |
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
