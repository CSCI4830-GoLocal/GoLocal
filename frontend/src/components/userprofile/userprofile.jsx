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
