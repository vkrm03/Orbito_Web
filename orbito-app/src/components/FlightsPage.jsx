// FlightsPage.js
import React, { useState } from 'react';
import { FaPlaneDeparture, FaTrain, FaBus, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch, FaMapMarkerAlt, FaPlane, FaMinus, FaPlus } from 'react-icons/fa';
import '../styles/Flight.css';

const FlightsPage = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [flightClass, setFlightClass] = useState('economy');
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

  // Mock Places API data
  const mockPlaces = [
    { id: 1, name: 'Chennai', code: 'MAA', country: 'India' },
    { id: 2, name: 'Mumbai', code: 'BOM', country: 'India' },
    { id: 3, name: 'Delhi', code: 'DEL', country: 'India' },
    { id: 4, name: 'Bangalore', code: 'BLR', country: 'India' },
    { id: 5, name: 'Hyderabad', code: 'HYD', country: 'India' },
    { id: 6, name: 'Kolkata', code: 'CCU', country: 'India' },
    { id: 7, name: 'Pune', code: 'PNQ', country: 'India' },
    { id: 8, name: 'Ahmedabad', code: 'AMD', country: 'India' },
    { id: 9, name: 'London', code: 'LHR', country: 'UK' },
    { id: 10, name: 'New York', code: 'JFK', country: 'USA' },
    { id: 11, name: 'Dubai', code: 'DXB', country: 'UAE' },
    { id: 12, name: 'Singapore', code: 'SIN', country: 'Singapore' }
  ];

  const handleLocationSearch = (query, type) => {
    if (query.length > 0) {
      const filtered = mockPlaces.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.code.toLowerCase().includes(query.toLowerCase())
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

  const handleLocationSelect = (place, type) => {
    if (type === 'from') {
      setFromLocation(`${place.name} (${place.code})`);
      setShowFromSuggestions(false);
    } else {
      setToLocation(`${place.name} (${place.code})`);
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
    console.log('Searching flights...', {
      from: fromLocation,
      to: toLocation,
      departure: departureDate,
      return: returnDate,
      tripType,
      flightClass,
      passengers
    });
  };

  return (
    <div className="flights-page">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-plane">
          <FaPlane />
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
            <h1>Find Your Perfect Flight</h1>
            <p>Search and compare flights from hundreds of airlines</p>
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
                        {fromSuggestions.map(place => (
                          <div 
                            key={place.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(place, 'from')}
                          >
                            <div className="suggestion-main">
                              <span className="city-name">{place.name}</span>
                              <span className="city-code">{place.code}</span>
                            </div>
                            <span className="country">{place.country}</span>
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
                        {toSuggestions.map(place => (
                          <div 
                            key={place.id}
                            className="suggestion-item"
                            onClick={() => handleLocationSelect(place, 'to')}
                          >
                            <div className="suggestion-main">
                              <span className="city-name">{place.name}</span>
                              <span className="city-code">{place.code}</span>
                            </div>
                            <span className="country">{place.country}</span>
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
                <span>Search Flights</span>
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
              <div className="passenger-age">2-11 years</div>
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
              <div className="passenger-age">Under 2 years</div>
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

              {/* Flight Class */}
              <div className="class-field">
                <label>Class</label>
                <select
                  value={flightClass}
                  onChange={(e) => setFlightClass(e.target.value)}
                  className="class-select"
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;