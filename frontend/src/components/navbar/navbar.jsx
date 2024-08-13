import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import './navbar.css';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">GoLocal</Link>
            </div>
            <div className="navbar-center">
                <form onSubmit={handleSearchSubmit} className="navbar-search-form">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Search..." 
                        className="navbar-search" 
                    />
                </form>
                <Link to="/posts" className="navbar-link">Posts</Link>
                <Link to="/businesses" className="navbar-link">Businesses</Link>
            </div>
            <div className="navbar-right">
                <Link to="/profile" className="navbar-link">Profile</Link>
                <button className="logout-button" onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    );
};

export default Navbar;
