import React from 'react';
import LanguageToggle from './LanguageToggle';

const LayoutToggle = ({ children, showLanguageToggle }) => {
    return (
        <div>
            {showLanguageToggle && <LanguageToggle />}
            {children} 
        </div>
    );
};

export default LayoutToggle;
