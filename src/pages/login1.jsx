import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store the token securely
        localStorage.setItem('token', data.token);
  
        // Clear error message
        setErrorMessage('');
  
        // Show success message and navigate to the dashboard
        setSuccessMessage('Login successful! Redirecting...');
        
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard
        }, 100); // Ensure there's a short delay for the success message to show
      } else {
        setErrorMessage(data.message || 'Invalid credentials.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '400px' }}>
        <div className="card-body">
          {/* Logo Section */}
          <div className="text-center mb-4">
            <img src="/download.jpg" alt="Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
          </div>

          {/* Title */}
          <h3 className="card-title text-center mb-3">Welcome Back!</h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>

          {/* Error and Success Messages */}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="d-block">Version 1.0.0</small>
            <a href="/support" className="d-block">Help & Support</a>
            <a href="/signup" className="d-block">Signup here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
