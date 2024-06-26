import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

function LandingPage() {
    return (
        <div className="home-container">
            <img src="images/magen_david.png" alt="left-icon" className="icon-left" />
            <h1 className="title">Welcome Soldier!</h1>
            <p>In Israel's war, we're all in uniform!</p><br></br>
                 <p>This website is for those
                 looking to help. Whether you want to support our 
                 Global public opinion outreach,
                  find a place to volunteer, or simply donate money to organizations
                   aiding in the war effort - you can find it in here.</p>
            <Link className="cta-button" to="/register">Register</Link>
            <Link className="cta-button" to="/login">Login</Link>
            <img src="images/magen_david.png" alt="right-icon" className="icon-right" />
            <div className="carousel-container">
            <div id="landingCarousel" className="carousel carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#landingCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#landingCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#landingCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/soldier_ai.png" className="d-block w-100" alt="Image 1" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Slide 1 Caption</h5>
                            <p>Description for Slide 1.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/bibi.jpg" className="d-block w-100" alt="Image 2" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Slide 2 Caption</h5>
                            <p>Description for Slide 2.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/meeting.jpg" className="d-block w-100" alt="Image 3" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Slide 3 Caption</h5>
                            <p>Description for Slide 3.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#landingCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#landingCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
