import React, { useState } from 'react';
import UserProfile from './UserProfile';

const App = () => {
  // Example userId, replace with dynamic value if needed
  const [userId, setUserId] = useState(1);

  return (
    <div className="app">
      <h1>User Profile</h1>
      <UserProfile userId={userId} />
    </div>
  );
};

export default App;
