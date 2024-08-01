import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
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
