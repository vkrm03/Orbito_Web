// App.js
import React from 'react';
import './App.css';
import HomePage from './components/Homepage';
import FlightsPage from '../src/components/FlightsPage';
import Navbar from '../src/components/Navbar';
import TrainsPage from '../src/components/Trainpage';
function App() {
  // Simple routing logic - you can replace this with React Router later
  const currentPath = window.location.pathname;

  const renderPage = () => {
    switch(currentPath) {
      case '/flights':
        return <FlightsPage />;
      case '/trains':
        return <TrainsPage />;
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