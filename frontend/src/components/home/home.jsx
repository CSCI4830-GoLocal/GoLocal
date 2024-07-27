import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import './home.css';



const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="company-name">Go Local</h1>
                <h2 className="page-title">A Social Media for Small Businesses</h2>
            </div>
            <div className="home-container">
                <h3 className="welcome-message">Welcome, {firstName} {lastName}</h3>
                <p className="home-description">
                    Welcome to Go Local, a social media platform for small businesses. 
                    We connect small businesses with their local communities. 
                </p>
                <button className="logout-button" onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    );
};

export default Home;