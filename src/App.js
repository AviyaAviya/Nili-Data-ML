import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './RegisterPage';
import TriviaChannel from './TriviaChannel/TriviaChannel';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import DonationPlaces from './DonationChannel/DonationPlaces';
import VolunteeringPlaces from './VolunteeringChannel/VolunteeringPlaces';
import UserProfile from './ProfileChannel/UserProfile';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/trivia" element={<TriviaChannel />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/donation' element={<DonationPlaces />} />
                <Route path='/volunteering' element={<VolunteeringPlaces />} />
                <Route path='/profile' element={<UserProfile />} />

            </Routes>
        </Router>
    );
}

export default App;
