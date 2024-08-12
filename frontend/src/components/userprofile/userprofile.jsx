import React from 'react';
import './userprofile.css';

const userprofile = () => {
    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
                <h1 className="user-name">John Doe</h1>
                <button className="edit-button">Edit Profile</button>
            </div>
            <div className="tabs">
                <button className="tab-button">Overview</button>
                <button className="tab-button">Favorites</button>
                <button className="tab-button">Reviews</button>
                <button className="tab-button">Settings</button>
            </div>
            <div className="content-section">
                <h2>About Me</h2>
                <p>This is a short bio about the user.</p>

                <h2>Contact Information</h2>
                <p>Email: johndoe@example.com</p>
                <p>Phone: (123) 456-7890</p>

                <h2>Recent Activity</h2>
                <p>Review: "Great service!" - 5 stars</p>
            </div>
        </div>
    );
}

export default userprofile;