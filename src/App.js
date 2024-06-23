import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TriviaChannel from './TriviaChannel/TriviaChannel';
import './styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page!</h1>
            <Link className="cta-button" to="/quiz">Go to Quiz App</Link>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
               
                
                <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/quiz" element={<TriviaChannel />} />
                
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
