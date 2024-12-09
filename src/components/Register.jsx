import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/apiService';
import './Register.css'; // Importing CSS for external styling

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async () => {
        try {
            await register(email, password);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage('Registration failed. Try again.');
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Create an Account</h1>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Create a password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="register-button" onClick={handleRegister}>
                Register
            </button>
            <p className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
                {message}
            </p>
        </div>
    );
};

export default Register;
