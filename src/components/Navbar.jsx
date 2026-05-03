import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-3 px-6 rounded-lg mt-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-gray-300 transition-colors">
        دفترچه تلفن
      </Link>
      <Link
        to="/contacts/add"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        + افزودن مخاطب
      </Link>
    </nav>
  );
};

export default Navbar;