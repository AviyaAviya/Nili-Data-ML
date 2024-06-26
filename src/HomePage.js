import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function HomePage() {
    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page!</h1>
            <Link className="cta-button" to="/trivia">Go to Quiz App</Link>
            <Link className="cta-button" to="/donation">Go to donation channel</Link>
            <Link className="cta-button" to="/volunteering">Go to volunteering channel</Link>

        </div>
    );
}
export default HomePage;