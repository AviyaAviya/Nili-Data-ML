import React from 'react';
import DonationPlace from './DonationPlaces/DonationPlace';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DonationPlaces.css';
const donationPlaces = [
    {
        name: 'ארגון נכי צהל',
        website: 'https://www.inz.org.il/',
        logoUrl: '/images/IDF_Disabled_Veterans.png',
    },
    {
        name: 'ארגון קדישא',
        website: 'https://www.kadisha.org/',
        logoUrl: '/images/kadisha.png',
    },
    {
        name: 'ארגון מדא',
        website: 'https://www.mdais.org/',
        logoUrl: '/images/mda.png',
    },
    {
        name: 'ארגון נפגעי פעולות האיבה',
        website: 'https://www.irgun.org.il/',
        logoUrl: '/images/Organization_Victims_Terrorism.png',
    },
    
];

function DonationChannel() {
    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Donation Channel</h1>
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
