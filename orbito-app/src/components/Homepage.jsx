import React, { useState, useEffect } from 'react';
import {
  FaPlaneDeparture, FaCar, FaTrain, FaHotel, FaUser, FaSignInAlt, FaFacebook,
  FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaGithub, FaSearch
} from 'react-icons/fa';
import '../styles/Homepage.css';

export default function HomePage() {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

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
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCardHover = (index) => {
    setCurrentDestination(index);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Book your trip with <span className="gradient-text">Orbito</span>
          </h1>
          <p className="hero-subtitle">
            Experience smarter booking for Flights, Cabs, and Hotels
          </p>
          <div className="cta-buttons">
            <button className="cta-btn">
              <FaSearch /> <span>Start Your Journey</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Popular Destinations */}
      <section className="popular">
        <div className="container">
          <div className="section-header">
            <h2>Popular Destinations</h2>
            <div className="header-line"></div>
          </div>
          <div className="popular-grid">
            {destinations.map((place, i) => (
              <div
                key={i}
                className={`destination-card ${i === currentDestination ? 'active' : ''}`}
                onMouseEnter={() => handleCardHover(i)}
              >
                <div className="card-image">
                  <img src={place.image} alt={place.name} />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content">
                  <h3>{place.name}</h3>
                  <div className="card-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <p className="footer-logo">Orbito</p>
            <p>Connecting all your travel needs smartly.</p>
          </div>
          <div className="footer-right">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaLinkedin /></a>
            <a href="#" className="social-link"><FaYoutube /></a>
            <a href="#" className="social-link"><FaGithub /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
