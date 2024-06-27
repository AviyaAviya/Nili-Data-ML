import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

function LandingPage() {
    const { t } = useTranslation();
    return (
        <div className="home-container">
              <LanguageToggle/>
            <img src="images/magen_david.png" alt="left-icon" className="icon-left" />
            <h1 className="title">{t('welcome1')}</h1>
            <p>{t('welcome2')}</p><br></br>
                 <p>{t('welcome3')}</p>
            <Link className="cta-button" to="/register">{t('registerButton')}</Link>
            <Link className="cta-button" to="/login">{t('loginButton')}</Link>
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
                        
                    </div>
                    <div className="carousel-item">
                        <img src="/images/bibi.jpg" className="d-block w-100" alt="Image 2" />
                        
                    </div>
                    <div className="carousel-item">
                        <img src="/images/meeting.jpg" className="d-block w-100" alt="Image 3" />
                        
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
