import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/LanguageToggle.css'; 

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
            .then(() => console.log('Language changed successfully'))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <button className="toggle-button" onClick={() => changeLanguage('en')}>English</button>
            <button className="toggle-button" onClick={() => changeLanguage('he')}>עברית</button>
        </div>
    );
};

export default LanguageToggle;
