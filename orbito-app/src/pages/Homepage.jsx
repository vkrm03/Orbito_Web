import React, { useState, useEffect } from 'react';
import {
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin,
  FaYoutube, FaGithub, FaSearch
} from 'react-icons/fa';

export default function Homepage() {
  const [currentDestination, setCurrentDestination] = useState(0);

  const destinations = [
    {
      name: 'London',
      image: 'https://plus.unsplash.com/premium_photo-1661962726504-fa8f464a1bb8?fm=jpg&q=60&w=3000'
    },
    {
      name: 'Spain',
      image: 'https://www.planetware.com/wpimages/2020/01/spain-in-pictures-beautiful-places-to-photograph-sagrada-familia-barcelona.jpg'
    },
    {
      name: 'Lisbon',
      image: 'https://media.istockphoto.com/id/1137863101/photo/lisbon-portugal-skyline.jpg?s=612x612'
    },
    {
      name: 'Croatia',
      image: 'https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/shutterstock_1094484185_frame-0ms-1920x1080-1-853x1080.jpg'
    },
    {
      name: 'Copenhagen',
      image: 'https://media.istockphoto.com/id/1455239157/photo/beautiful-winter-sunset-view-of-the-popular-nyhavn-area-at-copenhagen.jpg?s=612x612'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination(prev => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-inter bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative flex items-center justify-center h-screen text-white text-center px-4">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Book your trip with <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Orbito</span>
          </h1>
          <p className="text-lg mb-8">Experience smarter booking for Flights, Cabs, and Hotels</p>
          <button className="relative group px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-full font-semibold text-white hover:scale-105 transition-all">
            <FaSearch className="inline mr-2" /> Start Your Journey
            <span className="absolute left-0 top-0 w-full h-full bg-white opacity-10 blur-lg transition-all group-hover:translate-x-full"></span>
          </button>
        </div>
      </header>

      {/* Popular Destinations */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mb-12 rounded-full"></div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.map((place, i) => (
              <div
                key={i}
                onMouseEnter={() => setCurrentDestination(i)}
                className={`rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 ${
                  i === currentDestination ? 'scale-105 shadow-blue-300' : ''
                }`}
              >
                <div className="relative h-48">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 to-green-400/30 opacity-0 hover:opacity-100 transition duration-300"></div>
                </div>
                <div className="text-center p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 mt-2 rounded-full scale-x-0 hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold">Orbito</p>
            <p className="text-sm mt-2 opacity-75">Connecting all your travel needs smartly.</p>
          </div>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-300"><FaLinkedin /></a>
            <a href="#" className="hover:text-red-500"><FaYoutube /></a>
            <a href="#" className="hover:text-gray-400"><FaGithub /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
