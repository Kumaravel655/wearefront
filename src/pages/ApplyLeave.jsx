import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplyLeave.css';
import Logo from '/download.jpg';

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setErrorMessage('Start date cannot be later than end date.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/leave/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setErrorMessage(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: '500px' }}>
        <div className="card-body">
          {/* Logo Section */}
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
          </div>

          {/* Title */}
          <h3 className="card-title text-center mb-3">Apply for Leave</h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="leaveType" className="form-label">Leave Type</label>
              <select
                id="leaveType"
                className="form-control"
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">Reason</label>
              <textarea
                id="reason"
                className="form-control"
                placeholder="Enter the reason for leave"
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit Leave Application</button>
          </form>

          {/* Error and Success Messages */}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="d-block">Version 1.0.0</small>
            <a href="/dashboard" className="d-block">Back to Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
