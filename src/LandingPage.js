import React from 'react';
import {  Link} from 'react-router-dom';

function LandingPage() {
    return (
       

<div className="home-container">
            <h1 className="title">Welcome to the Landing Page!</h1>
            <p>Are you a new user or returning user?</p>
            <Link className="cta-button" to="/register">Register</Link>
            <Link className="cta-button" to="/login">Login</Link>
        </div>

     
       
    );
}

export default LandingPage;
