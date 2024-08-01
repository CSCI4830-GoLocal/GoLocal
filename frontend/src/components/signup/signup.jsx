import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setUser, setError } from '../../store/userSlice';
import './signup.css';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/user/create',
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                }
            );

            if (response.data.user) {
                dispatch(setUser({
                    email: response.data.user.email,
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    password: response.data.user.password
                }));
                navigate('/home');
            } else {
                dispatch(setError('Failed to create user'));
            }
        } catch (error) {
            console.error(error);
        } finally {
            console.log('Request completed');
        };
    };

    return (
        <div className="signup">
            <div className="signup-header">
                <h1 className="company-name">GoLocal</h1>
                <h2 className="page-title">A Social Media for Small Businesses</h2>
            </div>
            <div className="signup-container">
                <p className="signup-description">
                    Please enter the following information to sign up.
                </p>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="pin-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="pin-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="pin-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="pin-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p ckassName="signup-help">Contact GoLocal's support team if you struggle signing up</p>
                <Link to="/login" className="switch-auth-mode">
                    Already have an account? Log in here.
                </Link>
            </div>
        </div>
    );
}

export default Signup;