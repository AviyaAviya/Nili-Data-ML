
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear any previous messages

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: name,
                password: password
            });
            setMessage('User registered successfully!');
            console.log('User registered:', response.data);
            setRedirectToHome(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(`Error: ${error.response.data.error}`);
            } else {
                setMessage('Error registering user.');
            }
            console.error('Error registering user:', error);
        }
    };

    
    const redirectToLandingPage = () => {
        window.location.href = 'http://localhost:3000/';
    };
    const redirectToHomePage = () => {
        window.location.href = 'http://localhost:3000/home';
    };
    const { t } = useTranslation();
    return (
        <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <LanguageToggle/>
            <div className="card p-4 shadow">
                <h2 className="mb-3 text-center">{t('username_register')}</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">{t('username_register')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder={t('placeholder_u')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">{t('password_register')}</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder={t('placegolder_p')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        {t('registerButton2')}
                    </button>
                </form>
                {message && <div className="alert mt-4">{message}</div>}
                
                {/* Redirect button */}
                {redirectToHome&& ( <button
                    className="btn btn-secondary mt-3"
                    onClick={redirectToHomePage}
                >
                    {t('homepagebutton')}
                </button>)}
               
                <button
                    className="btn btn-secondary mt-3"
                    onClick={redirectToLandingPage}
                >
                    {t('landingpagebutton')}
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
