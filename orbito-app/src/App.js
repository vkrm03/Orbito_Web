// App.js
import React from 'react';
import './App.css';
import HomePage from './components/Homepage';
import FlightsPage from '../src/components/FlightsPage';
import Navbar from '../src/components/Navbar';

function App() {
  // Simple routing logic - you can replace this with React Router later
  const currentPath = window.location.pathname;

  const renderPage = () => {
    switch(currentPath) {
      case '/flights':
        return <FlightsPage />;
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