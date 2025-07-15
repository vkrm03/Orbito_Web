import React, { useState } from 'react';
import { 
  FaPlaneDeparture, FaCar, FaHotel, FaUser, 
  FaSignInAlt, FaTrain, FaBus 
} from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-10">
          <a href="/" className="relative text-2xl font-extrabold text-white">
            <span className="relative z-10">Orbito</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 blur-xl opacity-30 z-0 rounded"></div>
          </a>

          {/* Long Trips with Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-full transition cursor-pointer">
              <FaPlaneDeparture />
              <span>Long Trips</span>
            </div>
            <div className={`absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg py-2 w-44 transition-all duration-300 ${showDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <a href="/flights" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50">
                <FaPlaneDeparture /> Flights
              </a>
              <a href="/trains" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50">
                <FaTrain /> Trains
              </a>
              <a href="/buses" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50">
                <FaBus /> Buses
              </a>
            </div>
          </div>

          {/* Short Trips */}
          <a 
            href="/short-trips" 
            className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-full transition"
          >
            <FaCar /> <span>Short Trips</span>
          </a>

          {/* Hotels */}
          <a 
            href="/hotels" 
            className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-full transition"
          >
            <FaHotel /> <span>Hotels</span>
          </a>
        </div>

        {/* Right: Login/Register */}
        <div className="flex gap-4">
          <a 
            href="/login" 
            className="flex items-center gap-2 text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition"
          >
            <FaSignInAlt /> Login
          </a>
          <a 
            href="/register" 
            className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-green-400 px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            <FaUser /> Register
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
