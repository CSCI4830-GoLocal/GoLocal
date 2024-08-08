<<<<<<< Updated upstream
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { store } from './store/store'
import Login from './components/login/login.jsx'
import Home from './components/home/home.jsx'

=======
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { store } from './store/store';
import ProtectedRoute from './components/protectedRoute.jsx';
import Login from './components/login/login.jsx';
import Signup from './components/signup/signup.jsx';
import Home from './components/home/home.jsx';
import UserProfile from './components/userprofile/userprofile.jsx'; 
>>>>>>> Stashed changes

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
<<<<<<< Updated upstream
          <Route path="/home" element={<Home />} />
=======
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />  
            </ProtectedRoute>
          } />
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
