import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Channel.css';
import CustomNavbar from '../NavBar.js'; 
import LanguageToggle from '../LanguageToggle.js';

const UserProfileChannel = () => {
    const [donationHistory, setDonationHistory] = useState([]);
    const [volunteeringHistory, setVolunteeringHistory] = useState([]);
    const [newActivity, setNewActivity] = useState({ organization: '', type: 'donation', date: '', amountOrHours: '' });

    useEffect(() => {
        // Fetch user's donation and volunteering history
        axios.get('http://localhost:3000/user/donationHistory')
            .then(response => {
                setDonationHistory(response.data);
            })
            .catch(error => console.error(error));

        axios.get('http://localhost:3000/user/volunteeringHistory')
            .then(response => {
                setVolunteeringHistory(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleActivitySubmit = (e) => {
        e.preventDefault();
        // Make API call to save new activity data
        axios.post('http://localhost:3000/user/activities', newActivity) 
            .then(response => {
                // Add the new activity to the appropriate history based on the type (donation or volunteering)
                if (newActivity.type === 'donation') {
                    setDonationHistory([...donationHistory, newActivity]);
                } else {
                    setVolunteeringHistory([...volunteeringHistory, newActivity]);
                }
                setNewActivity({ organization: '', type: 'donation', date: '', amountOrHours: '' });
            })
            .catch(error => console.error(error));
    };

    return (
        
        <div className="container mt-5">
            <CustomNavbar />
            <LanguageToggle/>
            <h1 className="mb-4 text-center">UserProfile</h1>
            
            <div className="row">
                <div className="col-md-5">
                    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', border: '1px solid #dee2e6', borderRadius: '5px' }}>
                        <h2 className="mb-4 text-center">Add New Activity</h2>
                        <form onSubmit={handleActivitySubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                            <label>Name of the Place:</label>
                            <input type="text" className="form-control" value={newActivity.organization} onChange={(e) => setNewActivity({ ...newActivity, organization: e.target.value })} /><br />
                            <label>Choose Type:</label>
                            <select className="form-select" value={newActivity.type} onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value, amountOrHours: '' })}>
                                <option value="donation">Donation</option>
                                <option value="volunteering">Volunteering</option>
                            </select><br />
                            <label>Date:</label>
                            <input type="date" className="form-control" value={newActivity.date} onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })} /><br />
                            {newActivity.type === "donation" && (
                                <div>
                                    <label>Amount of Donation:</label>
                                    <input type="number" className="form-control" value={newActivity.amountOrHours} onChange={(e) => setNewActivity({ ...newActivity, amountOrHours: e.target.value })} /><br />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary">Submit Activity</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div>
                        <h2>Donation History</h2>
                        <ul>
                            {donationHistory.map((activity, index) => (
                                <li key={index}>{activity.organization} - {activity.amountOrHours} - {activity.date}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Volunteering History</h2>
                        <ul>
                            {volunteeringHistory.map((activity, index) => (
                                <li key={index}>{activity.organization} - {activity.amountOrHours} - {activity.date}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileChannel;
