import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Your Profile</h1>
      <div className="card p-4">
        <div>
          <img
            src={`/${profile.profilePicture}`}
            alt="Profile"
            className="img-fluid rounded-circle mb-3"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        <h2>{profile.firstName} {profile.lastName}</h2>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Designation:</strong> {profile.designation}</p>
        <p><strong>Bio ID:</strong> {profile.bioId}</p>
        <p><strong>Phone:</strong> {profile.phoneNumber}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = '/update-profile'}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
