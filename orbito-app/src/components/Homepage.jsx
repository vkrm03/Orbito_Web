import React, { useState, useEffect, useRef } from 'react';
import { FaPlaneDeparture, FaCar,FaTrain, FaHotel, FaUser, FaSignInAlt, FaFacebook, FaInstagram, FaTwitter, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import '../styles/Homepage.css';
export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  const destinations = [
    { name: 'London', image: 'https://plus.unsplash.com/premium_photo-1661962726504-fa8f464a1bb8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VudHJhbCUyMGxvbmRvbnxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Spain', image: 'https://www.planetware.com/wpimages/2020/01/spain-in-pictures-beautiful-places-to-photograph-sagrada-familia-barcelona.jpg' },
    { name: 'Lisbon', image: 'https://media.istockphoto.com/id/1137863101/photo/lisbon-portugal-skyline.jpg?s=612x612&w=0&k=20&c=kg88G4iDIDYNWSKys2mQm7eQU4qbc9YLoiZRFQnlVZU=' },
    { name: 'Croatia', image: 'https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/shutterstock_1094484185_frame-0ms-1920x1080-1-853x1080.jpg' },
    { name: 'Copenhagen', image: 'https://media.istockphoto.com/id/1455239157/photo/beautiful-winter-sunset-view-of-the-popular-nyhavn-area-at-copenhagen.jpg?s=612x612&w=0&k=20&c=ZvQzR6WmNJkiKYrCMFU6avv8bQ_74h9-UwWTBOuvjgA=' }
  ];

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      originalX: Math.random() * window.innerWidth,
      originalY: Math.random() * window.innerHeight,
      size: 4 + Math.random() * 8,
      opacity: 0.2 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 1,
      hue: Math.random() * 360
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Update particles to repel from cursor
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 120;
          
          let newX = particle.x;
          let newY = particle.y;
          
          if (distance < repelRadius && distance > 0) {
            // Repel from cursor
            const force = (repelRadius - distance) / repelRadius;
            const repelStrength = force * 4;
            newX += (dx / distance) * repelStrength;
            newY += (dy / distance) * repelStrength;
          } else {
            // Slowly return to original position
            const returnSpeed = 0.03;
            newX += (particle.originalX - particle.x) * returnSpeed;
            newY += (particle.originalY - particle.y) * returnSpeed;
          }
          
          // Keep particles within bounds
          newX = Math.max(particle.size, Math.min(window.innerWidth - particle.size, newX));
          newY = Math.max(particle.size, Math.min(window.innerHeight - particle.size, newY));
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
    };

    const animationFrame = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

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
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Interactive Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              background: `radial-gradient(circle, hsla(${particle.hue}, 70%, 60%, 0.8), hsla(${particle.hue}, 70%, 60%, 0.2))`,
              boxShadow: `0 0 ${particle.size * 2}px hsla(${particle.hue}, 70%, 60%, 0.4)`,
              transform: `translate(-50%, -50%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <span className="logo interactive">
              <span className="logo-text">Orbito</span>
              <div className="logo-glow"></div>
            </span>
            <div 
              className="nav-link interactive dropdown-trigger" 
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <FaPlaneDeparture />
              <span>Long Trips</span>
              <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                <a href="/flights" className="dropdown-item">
                  <FaPlaneDeparture />
                  <span>Flights</span>
                </a>
                <a href="/trains" className="dropdown-item">
                  <FaTrain />
                  <span>Trains</span>
                </a>
                <a href="/buses" className="dropdown-item">
                  <FaCar />
                  <span>Buses</span>
                </a>
              </div>
            </div>
            <a href="#" className="nav-link interactive">
              <FaCar />
              <span>Short Trips</span>
            </a>
            <a href="#" className="nav-link interactive">
              <FaHotel />
              <span>Hotels</span>
            </a>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-btn interactive">
              <FaSignInAlt />
              <span>Login</span>
            </a>
            <a href="#" className="nav-btn primary interactive">
              <FaUser />
              <span>Register</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Book your trip with 
            <span className="gradient-text"> Orbito</span>
          </h1>
          <p className="hero-subtitle">Experience smarter booking for Flights, Cabs, and Hotels</p>
          
          <div className="cta-buttons">
            <button className="cta-btn interactive">
              <FaSearch />
              <span>Start Your Journey</span>
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
                className={`destination-card interactive ${i === currentDestination ? 'active' : ''}`}
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
            <a href="#" className="social-link interactive">
              <FaFacebook />
            </a>
            <a href="#" className="social-link interactive">
              <FaInstagram />
            </a>
            <a href="#" className="social-link interactive">
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}