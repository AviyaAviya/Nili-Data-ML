import React from 'react';
import { useTranslation } from 'react-i18next';
import DonationPlace from './DonationPlaces/DonationPlace';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Channel.css';
import CustomNavbar from '../NavBar.js'; 
import LanguageToggle from '../LanguageToggle.js';

function DonationChannel() {
    const { t } = useTranslation();

    const donationPlaces = [
        {
            name: t('disabledVeterans'),
            website: 'https://www.inz.org.il/',
            logoUrl: '/images/IDF_Disabled_Veterans.png',
        },
        {
            name: t('zaka'),
            website: 'https://zaka.org.il/',
            logoUrl: '/images/zaka.png',
        },
        {
            name: t('mda'),
            website: 'https://www.mdais.org/',
            logoUrl: '/images/mda.png',
        },
        {
            name: t('victimsTerrorism'),
            website: 'https://www.irgun.org.il/',
            logoUrl: '/images/Organization_Victims_Terrorism.png',
        },
    ];

    return (
        <div className="container mt-5">
            <CustomNavbar id="navbar"/>
            <LanguageToggle/>
            <h1 className="mb-4-text-center">{t('donationOpportunities')}</h1>
            <div className="row">
                {donationPlaces.map((place, index) => (
                    <DonationPlace
                        key={index}
                        name={place.name}
                        website={place.website}
                        logoUrl={place.logoUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default DonationChannel;