import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import Navbar from '../navbar/navbar';
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
            <Navbar />
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