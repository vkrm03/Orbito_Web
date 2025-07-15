import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import OtpPage from './pages/OTPpage';
import ForgotPassword from './pages/ForgotPass';
import FlightsPage from './pages/FlightsPage';
import BusesPage from './pages/BusesPage';
import TrainPage from './pages/Trainpage';
import ShortTrip from './pages/ShortTrip';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/trains" element={<TrainPage />} />
        <Route path="/short-trips" element={<ShortTrip />} />
        <Route path="/flights" element={<div className="p-6">Flights Page</div>} />
        <Route path="/trains" element={<div className="p-6">Trains Page</div>} />
        <Route path="/buses" element={<div className="p-6">Buses Page</div>} />
        <Route path="/short-trips" element={<div className="p-6">Short Trips Page</div>} />
        <Route path="/hotels" element={<div className="p-6">Hotels Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
