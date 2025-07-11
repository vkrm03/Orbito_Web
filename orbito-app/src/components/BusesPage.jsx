// BusesPage.js
import React, { useState } from 'react';
import { FaPlaneDeparture, FaTrain, FaBus, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch, FaMapMarkerAlt, FaMinus, FaPlus, FaClock, FaRoute } from 'react-icons/fa';
import '../styles/Buses.css';

const BusesPage = () => {
  const [activeTab, setActiveTab] = useState('buses');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('one-way');
  const [busType, setBusType] = useState('any');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    seniors: 0
  });
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Mock Bus Stations/Cities data
  const mockCities = [
    { id: 1, name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    { id: 2, name: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { id: 3, name: 'Delhi', state: 'Delhi', country: 'India' },
    { id: 4, name: 'Bangalore', state: 'Karnataka', country: 'India' },
    { id: 5, name: 'Hyderabad', state: 'Telangana', country: 'India' },
    { id: 6, name: 'Kolkata', state: 'West Bengal', country: 'India' },
    { id: 7, name: 'Pune', state: 'Maharashtra', country: 'India' },
    { id: 8, name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    { id: 9, name: 'Kochi', state: 'Kerala', country: 'India' },
    { id: 10, name: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
    { id: 11, name: 'Mysore', state: 'Karnataka', country: 'India' },
    { id: 12, name: 'Trivandrum', state: 'Kerala', country: 'India' },
    { id: 13, name: 'Madurai', state: 'Tamil Nadu', country: 'India' },
    { id: 14, name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
    { id: 15, name: 'Nagpur', state: 'Maharashtra', country: 'India' }
  ];

  const handleLocationSearch = (query, type) => {
    if (query.length > 0) {
      const filtered = mockCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.state.toLowerCase().includes(query.toLowerCase())
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

  const handleLocationSelect = (city, type) => {
    if (type === 'from') {
      setFromLocation(`${city.name}, ${city.state}`);
      setShowFromSuggestions(false);
    } else {
      setToLocation(`${city.name}, ${city.state}`);
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
    return passengers.adults + passengers.children + passengers.seniors;
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
    console.log('Searching buses...', {
      from: fromLocation,
      to: toLocation,
      departure: departureDate,
      return: returnDate,
      tripType,
      busType,
      passengers
    });
  };

  return (
    <div className="buses-page">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-bus">
          <FaBus />
        </div>
        <div className="road-line road-1"></div>
        <div className="road-line road-2"></div>
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
            <h1>Find Your Perfect Bus Journey</h1>
            <p>Search and compare bus tickets from trusted operators</p>
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
                      placeholder="Departure city"
                      value={fromLocation}
                      onChange={(e) => {
                        setFromLocation(e.target.value);
                        handleLocationSearch(e.target.value, 'from');
                      }}
                      onFocus={() => setShowFromSuggestions(true)}
                    />
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <div className="suggestions-dropdown">
                        {fromSuggestions.map(city => (
                          <div 
                            key={city.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(city, 'from')}
                          >
                            <div className="suggestion-main">
                              <span className="city-name">{city.name}</span>
                              <span className="state-name">{city.state}</span>
                            </div>
                            <span className="country">{city.country}</span>
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
                      placeholder="Destination city"
                      value={toLocation}
                      onChange={(e) => {
                        setToLocation(e.target.value);
                        handleLocationSearch(e.target.value, 'to');
                      }}
                      onFocus={() => setShowToSuggestions(true)}
                    />
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <div className="suggestions-dropdown">
                        {toSuggestions.map(city => (
                          <div 
                            key={city.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(city, 'to')}
                          >
                            <div className="suggestion-main">
                              <span className="city-name">{city.name}</span>
                              <span className="state-name">{city.state}</span>
                            </div>
                            <span className="country">{city.country}</span>
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
                <span>Search Buses</span>
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
                <div className="input-icon-wrapper">
                  <button
                    type="button"
                    onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                    className="passenger-btn"
                  >
                    <FaUsers className="field-icon" />
                    {getTotalPassengers()} Passenger{getTotalPassengers() > 1 ? 's' : ''}
                  </button>
                  {showPassengerDropdown && (
                    <div className="passenger-dropdown">
                      <div className="passenger-section">
                        {/* Adults */}
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <div className="passenger-type">Adults</div>
                            <div className="passenger-age">18+ years</div>
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
                            <div className="passenger-age">5-17 years</div>
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

                        {/* Seniors */}
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <div className="passenger-type">Seniors</div>
                            <div className="passenger-age">60+ years</div>
                          </div>
                          <div className="passenger-counter">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('seniors', 'decrement')}
                              disabled={passengers.seniors <= 0}
                              className="counter-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="counter-value">{passengers.seniors}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('seniors', 'increment')}
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

              {/* Bus Type */}
              <div className="bus-type-field">
                <label>Bus Type</label>
                <select
                  value={busType}
                  onChange={(e) => setBusType(e.target.value)}
                  className="bus-type-select"
                >
                  <option value="any">Any Bus Type</option>
                  <option value="ac">AC</option>
                  <option value="non-ac">Non-AC</option>
                  <option value="sleeper">Sleeper</option>
                  <option value="semi-sleeper">Semi-Sleeper</option>
                  <option value="volvo">Volvo</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusesPage;