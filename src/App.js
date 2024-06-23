import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TriviaChannel from './TriviaChannel/TriviaChannel';
import './styles/Home.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page!</h1>
            <Link className="cta-button" to="/trivia">Go to Quiz App</Link>
            <Link className="cta-button" to="/login">Go to login</Link>
            <Link className="cta-button" to="/register">Go to register</Link>
            <Link className="cta-button" to="/donation">Go to donation channel</Link>
            <Link className="cta-button" to="/volunteering">Go to volunteering channel</Link>

        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
               
                
                <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/trivia" element={<TriviaChannel />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                </Routes>
                
            </div>
            
        </Router>
    );
}

export default App;
