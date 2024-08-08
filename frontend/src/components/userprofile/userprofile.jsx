<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/v1/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.name}'s profile`} className="profile-image" />
        <h2 className="profile-name">{user.name}</h2>
      </div>
      <div className="profile-details">
        <p>Email: {user.email}</p>
        <p>Bio: {user.bio}</p>
        <p>Location: {user.location}</p>
      </div>
    </div>
  );
};

export default UserProfile;
=======
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
>>>>>>> Stashed changes
