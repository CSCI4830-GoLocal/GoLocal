import React from 'react';
import { useSelector} from 'react-redux';
import Navbar from '../navbar/navbar';
import './home.css';



const Home = () => {
    const { firstName, lastName } = useSelector(state => state.user);

    return (
        <div className="home">
            <Navbar />
            <div className="home-container">
                <h3 className="welcome-message">Welcome, {firstName} {lastName}</h3>
                <p className="home-description">
                    Welcome to Go Local, a social media platform for small businesses. 
                    We connect small businesses with their local communities. 
                </p>
            </div>
        </div>
    );
};

export default Home;