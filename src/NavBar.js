import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './styles/NavBar.css';

const CustomNavbar = () => {
    const { t } = useTranslation();

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/home">{t('home')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/trivia">{t('quizApp')}</Nav.Link>
                        <Nav.Link as={Link} to="/donation">{t('donation')}</Nav.Link>
                        <Nav.Link as={Link} to="/volunteering">{t('volunteering')}</Nav.Link>
                        <Nav.Link as={Link} to="/profile">{t('myProfile')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;