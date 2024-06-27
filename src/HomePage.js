import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from './NavBar.js'; 
import LanguageToggle from './LanguageToggle.js';
function HomePage() {
    return (
        <>
            <CustomNavbar />
            <LanguageToggle/>
            <Container className="home-container">
                <h1 className="title1">AM ISRAEL HAI</h1>
                <br></br>
                <h1 className="title">"For in Your holy name You swore to him that his light would never be extinguished forever and ever."</h1>
                <div style={{ marginBottom: '20px' }} />
                <div className="media-grid">
                      
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/FairiTail.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/hanan.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/idan.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            
                          
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/omer.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/shlomo.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
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
                                <img src="images/food_soldiers.jpeg" alt="Image 3" className="media" />
                            </div>
                            <div className="grid-item">
                                <img src="images/food_soldiers.jpeg" alt="Image 3" className="media" />
                            </div>
                            
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/cfarMimon.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="grid-item">
                                <video controls className="media">
                                    <source src="videos/Bears.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                    
                        
                        
                </div>
            </Container>
        </>
    );
}

export default HomePage;
