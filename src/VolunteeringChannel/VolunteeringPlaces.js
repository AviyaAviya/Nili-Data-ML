import React from 'react';
import VolunteeringPlace from './VolunteeringPlaces/VolunteeringPlace';
import 'bootstrap/dist/css/bootstrap.min.css';

const volunteeringPlaces = [
    {
        name: 'ארגון פתחון לב',
        website: 'https://www.pitchonlev.org.il/form_page/general2024/',
        logoUrl: '/images/open_heart.png',
    },
    {
        name: 'ארגון איחוד הצלה',
        website: 'https://1221.org.il/',
        logoUrl: '/images/united_hatzalah.png',
    },
    {
        name: 'ארגון אחיות מברזל',
        website: 'https://barzelsisters.co.il/',
        logoUrl: '/images/sisters_from_iron.png',
    },
    {
        name: 'ארגון לחיות בכבוד',
        website: 'https://l-b.org.il/',
        logoUrl: '/images/live_in_dignity.png',
    },
    {
        name: 'ארגון לב אחד',
        website: 'https://www.levechad.org/',
        logoUrl: '/images/one_heart.jpeg',
    },
        
    
];

function VolunteeringChannel() {
    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">volunteering Channel</h1>
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
