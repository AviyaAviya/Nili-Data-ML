import React, { useState } from 'react';
import axios from 'axios';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear any previous messages

        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: name,
                password: password
            });
            setMessage('User registered successfully!');
            console.log('User registered:', response.data);
            // Redirect to the home page upon successful registration
        } catch (error) {
            setMessage('Error registering user.');
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>

            <div className="card p-4 shadow">
                <h2 className="mb-3 text-center">Register</h2>
                {/* Form element with in-line onSubmit handler */}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"   // Button type set to "submit" to trigger onSubmit
                        className="btn btn-primary w-100"
                    >
                        Register
                    </button>
                </form>
                {/* Display the message to the user */}
                {message && <div className="alert mt-4">{message}</div>}
            </div>
        </div>
    );
};

export default RegisterPage;
