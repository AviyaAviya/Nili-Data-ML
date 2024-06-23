import React, { useState } from 'react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle register functionality
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="mb-3 text-center">Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
