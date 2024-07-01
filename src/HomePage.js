import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from './NavBar.js'; 
import LanguageToggle from './LanguageToggle.js';

function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <CustomNavbar />
            
            <Container className="home-container">
            <LanguageToggle/>
                <h1 className="title1">{t('amIsraelHai')}</h1>
                <br></br>
                <h1 className="title">{t('quote')}</h1>
                <div style={{ marginBottom: '20px' }} />
               
                <div className="media-grid">
                <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/homeLand.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/hanan.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/idan.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/omer.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/shlomo.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <img src="images/clothes.jpeg" alt="Image 1" className="media" />
                    </div>
                    <div className="grid-item">
                        <img src="images/farms.jpeg" alt="Image 2" className="media" />
                    </div>
                    <div className="grid-item">
                        <img src="images/food_soldiers.jpeg" alt="Image 3" className="media" />
                    </div>
                    <div className="grid-item">
                        <img src="images/hamal.jpeg" alt="Image 3" className="media" />
                    </div>
                    <div className="grid-item">
                        <img src="images/farm2.jpeg" alt="Image 3" className="media" />
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/cfarMimon.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/hostages2.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/goosh_katif.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/wedding.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                    <div className="grid-item">
                        <video controls className="media">
                            <source src="videos/funeral.mp4" type="video/mp4" />
                            {t('videoUnsupported')}
                        </video>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomePage;