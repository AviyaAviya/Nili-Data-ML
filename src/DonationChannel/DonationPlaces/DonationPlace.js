import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Channel.css';
function DonationPlace({ name, website, logoUrl }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img src={logoUrl} className="card-img-top" alt={`${name} Logo`} />
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100">
                        TO DONATE
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DonationPlace;
