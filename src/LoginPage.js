
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = async () => {
    setMessage('');

   
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: name,
        password: password
      });


     
     
      // Handle successful login
      console.log('Login successful:', response.data);
      setMessage(t('loginSuccessful'));
      redirectToHomePage();
      // Redirect or update UI upon successful login
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`${t('errorLoggingIn')}: ${error.response.data.error}`);
      } else {
        setMessage(t('errorLoggingIn'));
      }
      console.error('Error logging in:', error);
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
      <LanguageToggle />
      <div className="card p-4 shadow" style={{ maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">{t('form_name_l')}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">{t('username_login')}</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={t('placeholder_u2')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">{t('password_login')}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={t('placegolder_p2')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            {t('loginButton2')}
          </button>
        </form>
        {message && <div className="alert mt-3">{message}</div>}
        <button
                    className="btn btn-secondary mt-3"
                    onClick={redirectToLandingPage}
                >
                    {t('landingpagebutton2')}
                </button>
      </div>
    </div>
  );
};

export default LoginPage;
