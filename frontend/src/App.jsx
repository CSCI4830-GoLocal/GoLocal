import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { store } from './store/store'
import Login from './components/login/login.jsx'
import Signup from './components/signup/signup.jsx'
import Home from './components/home/home.jsx'



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App