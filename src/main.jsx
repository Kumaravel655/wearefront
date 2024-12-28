import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
 
import Login1 from './pages/login1.jsx';
import Signup from './pages/signup.jsx';
import Userprofile from './pages/UserProfile.jsx';
import ApplyLeave from './pages/ApplyLeave.jsx';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<Userprofile />} />
        <Route
          path="/dashboard" element={<Dashboard />}/>
        <Route path="/applyleave" element={<ApplyLeave />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
