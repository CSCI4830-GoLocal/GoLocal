import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/navbar.jsx';
import './userprofile.css';
import defaultProfilePic from './images/gpic.jpg';


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch user data from the Redux store
  const user = useSelector(state => state.user);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="user-profile">
        <div className="profile-header">
          <img src={user.profilePic || defaultProfilePic} alt="Profile" className="profile-pic" />
          <h1 className="user-name">{user.firstName} {user.lastName}</h1>
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
                {user.bio || 'Your bio lives here. Tell us about yourself, background, interests, or any other personal details.'}
              </p>

              <h2>Contact Information</h2>
              <p>Email: {user.email || 'johndoe@example.com'}</p>
              <p>Phone: {user.phone || '(123) 456-7890'}</p>

              <h2>Recent Activity</h2>
              <p>Review: {user.recentReview || '"Great service!" - 5 stars'}</p>
              <p>Recent post: {user.recentPost || '"Enjoyed a wonderful dinner at the new restaurant." - 10 minutes ago'}</p>
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
