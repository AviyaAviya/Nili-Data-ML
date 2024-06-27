import React from 'react';
import VolunteeringPlace from './VolunteeringPlaces/VolunteeringPlace';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../NavBar.js'; 
import '../styles/Channel.css';
import LanguageToggle from '../LanguageToggle.js';
const volunteeringPlaces = [
    {
        name: 'Open Heart',
        website: 'https://www.pitchonlev.org.il/form_page/general2024/',
        logoUrl: '/images/open_heart.png',
    },
    {
        name: 'United Hatzalah',
        website: 'https://1221.org.il/',
        logoUrl: '/images/united_hatzalah.png',
    },
    {
        name: 'Sisters From Iron',
        website: 'https://barzelsisters.co.il/',
        logoUrl: '/images/sisters_from_iron.png',
    },
    {
        name: 'Live In Dignity',
        website: 'https://l-b.org.il/',
        logoUrl: '/images/live_in_dignity.png',
    },
    {
        name: 'One Heart',
        website: 'https://www.levechad.org/',
        logoUrl: '/images/one_heart.jpeg',
    },
        
    
];

function VolunteeringChannel() {
    return (
        <div className="container mt-5">
            <CustomNavbar  id="navbar"/>
            <LanguageToggle/>
            <h1 className="mb-4-text-center">Where Can I Help</h1>
            <div className="row">
                {volunteeringPlaces.map((place, index) => (
                    <VolunteeringPlace
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

export default VolunteeringChannel;
