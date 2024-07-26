import React, { useState } from "react";
import axios from 'axios';
import './LoginSignup.css';


const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    
    const handleLogin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/v1/user/list');
            const users = response.data;

            const userExists = users.some(user => user.email === email && user.password === password);
            if (userExists) {
                alert('Login successful');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    const handleSignup = async () => {}

    const handleSubmit = (event) => {
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    }

    
    return (
        <div className="login-signup-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default LoginSignup;