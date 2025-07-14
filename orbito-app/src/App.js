// App.js
import React from 'react';
import './App.css';
import HomePage from './components/Homepage';
import FlightsPage from '../src/components/FlightsPage';
import Navbar from '../src/components/Navbar';
import TrainsPage from '../src/components/Trainpage';
import BusesPage from '../src/components/BusesPage';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
function App() {
  // Simple routing logic - you can replace this with React Router later
  const currentPath = window.location.pathname;

  const renderPage = () => {
    switch(currentPath) {
      case '/flights':
        return <FlightsPage />;
      case '/trains':
        return <TrainsPage />;
      case '/buses':
        return <BusesPage />;
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      {renderPage()}
    </div>
  );
}

export default App;