// TrainsPage.js
import React, { useState } from 'react';
import { FaPlaneDeparture, FaTrain, FaBus, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch, FaMapMarkerAlt, FaMinus, FaPlus } from 'react-icons/fa';
import '../styles/Train.css';

const TrainsPage = () => {
  const [activeTab, setActiveTab] = useState('trains');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [trainClass, setTrainClass] = useState('sleeper');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Mock Train Stations data
  const mockStations = [
    { id: 1, name: 'Chennai Central', code: 'MAS', state: 'Tamil Nadu' },
    { id: 2, name: 'Mumbai Central', code: 'MMCT', state: 'Maharashtra' },
    { id: 3, name: 'New Delhi', code: 'NDLS', state: 'Delhi' },
    { id: 4, name: 'Bangalore City', code: 'BNC', state: 'Karnataka' },
    { id: 5, name: 'Hyderabad Decan', code: 'HYB', state: 'Telangana' },
    { id: 6, name: 'Howrah Junction', code: 'HWH', state: 'West Bengal' },
    { id: 7, name: 'Pune Junction', code: 'PUNE', state: 'Maharashtra' },
    { id: 8, name: 'Ahmedabad Junction', code: 'ADI', state: 'Gujarat' },
    { id: 9, name: 'Jaipur Junction', code: 'JP', state: 'Rajasthan' },
    { id: 10, name: 'Lucknow Junction', code: 'LJN', state: 'Uttar Pradesh' },
    { id: 11, name: 'Bhopal Junction', code: 'BPL', state: 'Madhya Pradesh' },
    { id: 12, name: 'Coimbatore Junction', code: 'CBE', state: 'Tamil Nadu' }
  ];

  const handleLocationSearch = (query, type) => {
    if (query.length > 0) {
      const filtered = mockStations.filter(station => 
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.code.toLowerCase().includes(query.toLowerCase())
      );
      
      if (type === 'from') {
        setFromSuggestions(filtered);
        setShowFromSuggestions(true);
      } else {
        setToSuggestions(filtered);
        setShowToSuggestions(true);
      }
    } else {
      if (type === 'from') {
        setShowFromSuggestions(false);
      } else {
        setShowToSuggestions(false);
      }
    }
  };

  const handleLocationSelect = (station, type) => {
    if (type === 'from') {
      setFromLocation(`${station.name} (${station.code})`);
      setShowFromSuggestions(false);
    } else {
      setToLocation(`${station.name} (${station.code})`);
      setShowToSuggestions(false);
    }
  };

  const updatePassengerCount = (type, action) => {
    setPassengers(prev => ({
      ...prev,
      [type]: action === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    console.log('Searching trains...', {
      from: fromLocation,
      to: toLocation,
      departure: departureDate,
      return: returnDate,
      tripType,
      trainClass,
      passengers
    });
  };

  return (
    <div className="trains-page">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-train">
          <FaTrain />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            <FaPlaneDeparture />
            <span>Flights</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trains' ? 'active' : ''}`}
            onClick={() => setActiveTab('trains')}
          >
            <FaTrain />
            <span>Trains</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'buses' ? 'active' : ''}`}
            onClick={() => setActiveTab('buses')}
          >
            <FaBus />
            <span>Buses</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-section">
          <div className="search-header">
            <h1>Book Your Train Journey</h1>
            <p>Find and book train tickets across India</p>
          </div>

          <div className="search-form">
            {/* Trip Type Selection */}
            <div className="trip-type-selector">
              <label className={`trip-type-option ${tripType === 'round-trip' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="round-trip" 
                  checked={tripType === 'round-trip'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                <span>Round Trip</span>
              </label>
              <label className={`trip-type-option ${tripType === 'one-way' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="one-way" 
                  checked={tripType === 'one-way'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                <span>One Way</span>
              </label>
            </div>

            {/* Location Fields */}
            <div className="location-fields">
              <div className="location-group">
                <div className="location-field">
                  <label>From</label>
                  <div className="input-container">
                    <FaMapMarkerAlt className="field-icon" />
                    <input
                      type="text"
                      placeholder="Departure station"
                      value={fromLocation}
                      onChange={(e) => {
                        setFromLocation(e.target.value);
                        handleLocationSearch(e.target.value, 'from');
                      }}
                      onFocus={() => setShowFromSuggestions(true)}
                    />
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <div className="suggestions-dropdown">
                        {fromSuggestions.map(station => (
                          <div 
                            key={station.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(station, 'from')}
                          >
                            <div className="suggestion-main">
                              <span className="station-name">{station.name}</span>
                              <span className="station-code">{station.code}</span>
                            </div>
                            <span className="state">{station.state}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button className="swap-btn" onClick={swapLocations}>
                  <FaExchangeAlt />
                </button>

                <div className="location-field">
                  <label>To</label>
                  <div className="input-container">
                    <FaMapMarkerAlt className="field-icon" />
                    <input
                      type="text"
                      placeholder="Destination station"
                      value={toLocation}
                      onChange={(e) => {
                        setToLocation(e.target.value);
                        handleLocationSearch(e.target.value, 'to');
                      }}
                      onFocus={() => setShowToSuggestions(true)}
                    />
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <div className="suggestions-dropdown">
                        {toSuggestions.map(station => (
                          <div 
                            key={station.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(station, 'to')}
                          >
                            <div className="suggestion-main">
                              <span className="station-name">{station.name}</span>
                              <span className="station-code">{station.code}</span>
                            </div>
                            <span className="state">{station.state}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="search-btn" onClick={handleSearch}>
                <FaSearch />
                <span>Search Trains</span>
              </button>
            </div>

            {/* Date and Passenger Fields */}
            <div className="date-passenger-fields">
              {/* Departure Date */}
              <div className="date-field">
                <label>Departure</label>
                <div className="input-container">
                  <FaCalendarAlt className="field-icon" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={getMinDate()}
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' && (
                <div className="date-field">
                  <label>Return</label>
                  <div className="input-container">
                    <FaCalendarAlt className="field-icon" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departureDate || getMinDate()}
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div className="passenger-field">
                <label>Passengers</label>
                <div className="input-container">
                  <FaUsers className="field-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                    className="passenger-btn"
                  >
                    {getTotalPassengers()} Passenger{getTotalPassengers() > 1 ? 's' : ''}
                  </button>
                  {showPassengerDropdown && (
                    <div className="passenger-dropdown">
                      <div className="passenger-section">
                        {/* Adults */}
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <div className="passenger-type">Adults</div>
                            <div className="passenger-age">12+ years</div>
                          </div>
                          <div className="passenger-counter">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('adults', 'decrement')}
                              disabled={passengers.adults <= 1}
                              className="counter-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="counter-value">{passengers.adults}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('adults', 'increment')}
                              className="counter-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <div className="passenger-type">Children</div>
                            <div className="passenger-age">5-11 years</div>
                          </div>
                          <div className="passenger-counter">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('children', 'decrement')}
                              disabled={passengers.children <= 0}
                              className="counter-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="counter-value">{passengers.children}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('children', 'increment')}
                              className="counter-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <div className="passenger-type">Infants</div>
                            <div className="passenger-age">Under 5 years</div>
                          </div>
                          <div className="passenger-counter">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('infants', 'decrement')}
                              disabled={passengers.infants <= 0}
                              className="counter-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="counter-value">{passengers.infants}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('infants', 'increment')}
                              className="counter-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassengerDropdown(false)}
                        className="done-btn"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Train Class */}
              <div className="class-field">
                <label>Class</label>
                <select
                  value={trainClass}
                  onChange={(e) => setTrainClass(e.target.value)}
                  className="class-select"
                >
                  <option value="sleeper">Sleeper (SL)</option>
                  <option value="3ac">3rd AC (3A)</option>
                  <option value="2ac">2nd AC (2A)</option>
                  <option value="1ac">1st AC (1A)</option>
                  <option value="cc">Chair Car (CC)</option>
                  <option value="ec">Executive Chair (EC)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainsPage;