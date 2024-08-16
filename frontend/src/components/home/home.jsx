import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/navbar';
import './home.css';

const Home = () => {
    const { firstName, lastName } = useSelector(state => state.user);

    return (
        <div className="home">
            <Navbar />
            <div className="home-container">
                <div className="card welcome-card">
                    <h3 className="welcome-message">Welcome, {firstName} {lastName}</h3>
                </div>
                <div className="card description-card">
                    <p className="home-description">
                        Welcome to Go Local, a social media platform for small businesses.
                        <br />
                        <br />
                        Let's get started:
                    </p>
                    <p className="home-instructions">
                        List your business on our platform to attract local customers and showcase your offerings.
                        <br />
                        <br />
                        Connect with potential customers through updates, promotions, and events.
                        <br />
                        <br />
                        Gain Insights with our tools to understand your audience and grow your business effectively.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
