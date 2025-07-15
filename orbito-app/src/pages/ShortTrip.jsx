import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function ShortTrip() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (from && to) {
      setShowResults(true);
    }
  };

  const vehicles = [
    { type: 'Moto-mini', icon: '🛵', price: '₹184.85' },
    { type: 'Cab-mini', icon: '🚗', price: '₹246.95' },
    { type: 'Moto', icon: '🏍️', price: '₹211.49' },
    { type: 'Auto', icon: '🛺', price: '₹301.05' },
    { type: 'Lux-Sedan', icon: '🚘', price: '₹323.24' },
    { type: 'Sedan', icon: '🚖', price: '₹282.45' },
    { type: 'SUV', icon: '🚙', price: '₹414.33' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center py-12 px-4">
        {!showResults ? (
          <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Get a <span className="text-blue-600">Ride</span>
            </h2>

            <div>
              <label className="block text-sm text-gray-700 mb-1">From</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10 w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">To</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Drop-off location"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10 w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaSearch /> Search Nearby
            </button>
          </div>
        ) : (
          <div className="w-full max-w-7xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT SIDE: Form + Vehicle List */}
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              <div>
                <label className="block text-sm text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 py-2 px-4 rounded-lg"
                  value={from}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 py-2 px-4 rounded-lg"
                  value={to}
                  readOnly
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-4">Available Vehicles</h3>
              {vehicles.map((v, i) => (
                <div key={i} className="flex justify-between items-center border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                  <div>
                    <p className="font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-xl">{v.icon}</span> {v.type}
                    </p>
                    <p className="text-sm text-gray-500">2 mins away</p>
                  </div>
                  <p className="text-green-600 font-semibold">{v.price}</p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: MAP */}
            <div className="h-[80vh] w-full rounded-lg overflow-hidden shadow-md">
              <MapContainer
                center={[12.872294, 80.223907]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[12.872294, 80.223907]}>
                  <Popup>Pickup Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
