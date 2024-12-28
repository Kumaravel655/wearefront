import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaCog, FaClipboardList, FaHome, FaSignOutAlt, FaChartPie, FaUserCheck, FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme state

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`d-lg-flex vh-100 ${isDarkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* Sidebar */}
      <div
        className={`sidebar p-3 ${isDarkTheme ? 'bg-secondary text-white' : 'bg-dark text-white'} ${isMenuOpen ? 'd-block' : 'd-none d-lg-block'}`}
        style={{ minWidth: '250px', boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <h2 className="text-center mb-4">Menu</h2>
        <ul className="list-unstyled">
          <li className="py-3 px-3 d-flex align-items-center menu-item" onClick={() => navigate('/dashboard')}>
            <FaHome className="me-2" /> Dashboard
          </li>
          <li className="py-3 px-3 d-flex align-items-center menu-item" onClick={() => navigate('/applyleave')}>
            <FaClipboardList className="me-2" /> Apply Leave
          </li>
          <li className="py-3 px-3 d-flex align-items-center menu-item" onClick={() => navigate('/settings')}>
            <FaCog className="me-2" /> Settings
          </li>
          <li className="py-3 px-3 d-flex align-items-center menu-item text-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Bar */}
        <nav className={`navbar navbar-expand-lg px-3 ${isDarkTheme ? 'bg-secondary' : 'bg-white shadow-sm'}`}>
          <button className="btn btn-outline-dark d-lg-none" onClick={toggleMenu}>
            <FaBars />
          </button>
          <h1 className="ms-3 mb-0">Welcome, {username ? username : 'User'}!</h1>
          <button className="btn ms-auto" onClick={toggleTheme}>
            {isDarkTheme ? <FaSun size={20} color="#ffd700" /> : <FaMoon size={20} />}
          </button>
        </nav>

        {/* Dashboard Content */}
        <div className="container-fluid mt-4">
          <div className="row g-4">
            {/* Metrics Cards */}
            <div className="col-lg-4 col-md-6">
              <div className={`card shadow-sm text-center p-4 ${isDarkTheme ? 'bg-dark text-white' : ''}`}>
                <FaChartPie className="mb-3" size={40} color="#007bff" />
                <h4>Total Leaves Taken</h4>
                <p className="display-5">12</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className={`card shadow-sm text-center p-4 ${isDarkTheme ? 'bg-dark text-white' : ''}`}>
                <FaUserCheck className="mb-3" size={40} color="#28a745" />
                <h4>Leaves Approved</h4>
                <p className="display-5">8</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className={`card shadow-sm text-center p-4 ${isDarkTheme ? 'bg-dark text-white' : ''}`}>
                <FaClipboardList className="mb-3" size={40} color="#dc3545" />
                <h4>Pending Approvals</h4>
                <p className="display-5">3</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-5">
            <h3>Upcoming Deadlines</h3>
            <ul className="list-group">
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${isDarkTheme ? 'bg-secondary text-white' : ''}`}
              >
                Submit leave report <span className="badge bg-primary rounded-pill">2 days</span>
              </li>
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${isDarkTheme ? 'bg-secondary text-white' : ''}`}
              >
                Project deadline <span className="badge bg-danger rounded-pill">5 days</span>
              </li>
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${isDarkTheme ? 'bg-secondary text-white' : ''}`}
              >
                Team meeting <span className="badge bg-success rounded-pill">1 week</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
