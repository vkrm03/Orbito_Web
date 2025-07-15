import React, { useState, useRef, useEffect } from 'react';
import {
  FaBus, FaExchangeAlt, FaCalendarAlt, FaSearch, FaMapMarkerAlt,
  FaUsers, FaPlus, FaMinus
} from 'react-icons/fa';

export default function BusesPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState({ adult: 1, child: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const totalPassengers = passengers.adult + passengers.child;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCount = (type, delta) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Search Buses</h2>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input type="text" placeholder="Departure city" value={from} onChange={e => setFrom(e.target.value)} className="pl-10 w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <button onClick={swap} className="bg-blue-100 p-2 rounded-full hover:bg-blue-200">
              <FaExchangeAlt className="text-blue-600" />
            </button>
          </div>
          <div className="col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input type="text" placeholder="Destination city" value={to} onChange={e => setTo(e.target.value)} className="pl-10 w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Travel</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="pl-10 w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          {/* Passenger Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer bg-white hover:border-blue-400"
            >
              <span><FaUsers className="inline-block mr-2" /> {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}</span>
            </div>

            {showDropdown && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-2 p-4 space-y-3">
                {['adult', 'child'].map(type => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="capitalize">{type}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCount(type, -1)} className="bg-gray-200 p-1 rounded hover:bg-gray-300"><FaMinus /></button>
                      <span>{passengers[type]}</span>
                      <button onClick={() => handleCount(type, 1)} className="bg-gray-200 p-1 rounded hover:bg-gray-300"><FaPlus /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          <FaSearch /> Search Buses
        </button>
      </div>
    </div>
  );
}
