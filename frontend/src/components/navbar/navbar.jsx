import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/userSlice';
import './navbar.css';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">GoLocal</Link>
            </div>
            <div className="navbar-center">
                <input type="text" placeholder="Search..." className="navbar-search" />
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