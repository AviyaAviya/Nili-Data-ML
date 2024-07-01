import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Channel.css';
import CustomNavbar from '../NavBar.js'; 
import LanguageToggle from '../LanguageToggle.js';

const UserProfileChannel = () => {
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [money, setMoney] = useState('');
    const [message, setMessage] = useState('');
  

    useEffect(() => {
        axios.get('http://localhost:5000/user/profile')
            .then(response => {
                const { user_profile, donation_history, volunteering_history } = response.data;

                setName(user_profile.name);
                setOrganization(user_profile.organization);
                setType(user_profile.type);
                setDate(user_profile.date);
                setMoney(user_profile.money);

            
            })
            .catch(error => console.error(error));
    }, []);

    const handleActivitySubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear any previous messages

        try {
            const response = await axios.post('http://localhost:5000/profile', {
                username: name,
                place: organization,
                date: date,
                amountOfMoney: money
            });

            setMessage('New place added successfully!');
            console.log('Form submitted:', response.data);
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(`Error: ${error.response.data.error}`);
            } else {
                setMessage('Error submitting form.');
            }
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mt-5">
            <CustomNavbar />
            <LanguageToggle />
            

            <div>
                
                
                <p>Organization: {organization}</p>
                <p>Type of Activity: {type}</p>
                <p>Date: {date}</p>
                <p>Amount of Money: {money}</p>
               
            </div>
            <div>
                
                
                <p>Organization: {organization}</p>
                <p>Type of Activity: {type}</p>
                <p>Date: {date}</p>
                <p>Amount of Money: {money}</p>
               
            </div>

            <div className="row">
                <div className="col-md-5">
                    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', border: '1px solid #dee2e6', borderRadius: '5px' }}>
                        <h2 className="mb-4 text-center">Add New Activity</h2>
                        <form onSubmit={handleActivitySubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                            <label>Name of the Place:</label>
                            <input type="text" className="form-control" value={organization} onChange={(e) => setOrganization(e.target.value)} /><br />
                            <label>Choose Type:</label>
                            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="donation">Donation</option>
                                <option value="volunteering">Volunteering</option>
                            </select><br />
                            <label>Date:</label>
                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} /><br />
                            {type === "donation" && (
                                <div>
                                    <label>Amount of Donation:</label>
                                    <input type="number" className="form-control" value={money} onChange={(e) => setMoney(e.target.value)} /><br />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary">Submit Activity</button>
                        </form>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};

export default UserProfileChannel;
