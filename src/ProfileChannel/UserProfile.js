import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../NavBar.js'; 
import LanguageToggle from '../LanguageToggle.js';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [type, setType] = useState(''); // Default to empty (none selected initially)
  const [date, setDate] = useState('');
  const [money, setMoney] = useState('');
  const [message, setMessage] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [volunteeringHistory, setVolunteeringHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    try {
      const response = await axios.get(`http://localhost:5000/user/${username}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { user_profile, donation_history, volunteering_history } = response.data;

      setName(user_profile.name);
      setOrganization(user_profile.organization);
      setType(''); // Reset type to none initially
      setDate(user_profile.date);
      setMoney(user_profile.money);

      // Filter donation history and volunteering history by username
      const filteredDonations = donation_history.filter(item => item.username === username);
      const filteredVolunteering = volunteering_history.filter(item => item.username === username);

      setDonationHistory(filteredDonations);
      setVolunteeringHistory(filteredVolunteering);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    // Check if type is selected
    if (!type) {
      setMessage('Please select a type (Donation or Volunteering)');
      return;
    }

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    try {
      const response = await axios.post(`http://localhost:5000/user/${username}/profile`, {
        place: organization,
        type: type,
        date: date,
        amountOfMoney: type === 'donation' ? money : null // Only send money if type is donation
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('New activity added successfully!');
      console.log('Form submitted:', response.data);

      // Refetch data to update history
      fetchData();
    } catch (error) {
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
        <h2>User Profile</h2>
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
                <option value="">Select Type</option>
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
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>

      <div>
        <h2>Donation History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.place}</td>
                <td>{item.date}</td>
                <td>{item.amount_of_money}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Volunteering History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {volunteeringHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.place}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
