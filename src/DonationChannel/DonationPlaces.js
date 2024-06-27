import React from 'react';
import DonationPlace from './DonationPlaces/DonationPlace';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Channel.css';
import CustomNavbar from '../NavBar.js'; 
import LanguageToggle from '../LanguageToggle.js';
const donationPlaces = [
    {
        name: 'Disables Veterans',
        website: 'https://www.inz.org.il/',
        logoUrl: '/images/IDF_Disabled_Veterans.png',
    },
    {
        name: 'Zaka',
        website: 'https://zaka.org.il/',
        logoUrl: '/images/zaka.png',
    },
    {
        name: 'MDA',
        website: 'https://www.mdais.org/',
        logoUrl: '/images/mda.png',
    },
    {
        name: 'Victims Terrorism',
        website: 'https://www.irgun.org.il/',
        logoUrl: '/images/Organization_Victims_Terrorism.png',
    },
    
];

function DonationChannel() {
    return (
        
        <div className="container mt-5">
            <CustomNavbar  id="navbar"/>
            <LanguageToggle/>
            <h1 className="mb-4-text-center">Donation Opportunities</h1>
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
