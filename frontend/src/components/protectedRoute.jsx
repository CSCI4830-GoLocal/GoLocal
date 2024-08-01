import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { firstName } = useSelector(state => state.user);

    return firstName ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;