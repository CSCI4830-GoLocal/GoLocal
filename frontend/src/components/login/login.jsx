import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setUser, setError} from '../../store/userSlice';
import './login.css';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector(state => state.user);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_URL}/api/v1/user/list`);
            const users = response.data.users;

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                dispatch(setUser({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password
                }));
                navigate('/home');
            } else {
                dispatch(setError('User not found'));
            }
        } catch (error) {
            console.error(error);
        } finally {
            console.log('Request completed');
        };
    };

    return (
        <div className="login">
            <div className="login-header">
                <h1 className="company-name">GoLocal</h1>
                <h2 className="page-title">A Social Media for Small Businesses</h2>
            </div>
            <div className="login-container">
                <p className="login-description">
                    Please enter your email and password to log in.
                </p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="pin-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="pin-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Submit</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="login-help">Contact GoLocal's support team if you struggle logging in</p>
                <Link to="/signup" className="switch-auth-mode">
                    Don't have an account? Sign up here.
                </Link>
            </div>
        </div>
    );
};

export default Login;