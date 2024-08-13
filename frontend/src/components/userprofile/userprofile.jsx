import React, { useState } from 'react';
import Navbar from '../navbar/navbar.jsx';
import './userprofile.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="user-profile">
        <div className="profile-header">
          <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
          <h1 className="user-name">John Doe</h1>
          <button className="edit-button" onClick={() => handleTabClick('editProfile')}>Edit Profile</button>
        </div>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => handleTabClick('favorites')}
          >
            Favorites
          </button>
          <button
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            Reviews
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            Settings
          </button>
        </div>
        <div className="content-section">
          {activeTab === 'overview' && (
            <>
              <h2>About Me</h2>
              <p>
                This is a short bio about the user. Include information about their background,
                interests, or any other personal details.
              </p>

              <h2>Contact Information</h2>
              <p>Email: johndoe@example.com</p>
              <p>Phone: (123) 456-7890</p>

              <h2>Recent Activity</h2>
              <p>Review: "Great service!" - 5 stars</p>
              <p>Recent post: "Enjoyed a wonderful dinner at the new restaurant." - 10 minutes ago</p>
            </>
          )}
          {activeTab === 'favorites' && (
            <>
              <h2>Favorites</h2>
              <p>List of favorite items or places.</p>
            </>
          )}
          {activeTab === 'reviews' && (
            <>
              <h2>Reviews</h2>
              <p>List of user reviews for products or services.</p>
            </>
          )}
          {activeTab === 'settings' && (
            <>
              <h2>Settings</h2>
              <p>Profile settings options.</p>
            </>
          )}
          {activeTab === 'editProfile' && (
            <>
              <h2>Edit Profile</h2>
              <p>Form or options to edit user profile.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
