import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = "Tariq__" + localStorage.getItem('userToken');
      if (!token) {
        return;
      }

      const url = 'https://ecommerce-node4.vercel.app/user/profile';
      const config = {
        headers: { 'Authorization': token }
      };

      try {
        const response = await axios.get(url, config);
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card border-0 shadow-lg" style={{ maxWidth: '1000px' }}>
          <div className="d-flex justify-content-center">
            <img
              src={userData?.image.secure_url}
              alt={userData?.userName}
              className="card-img-top rounded-top img-fluid"
              style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <div className="card-body text-center">
            <h2 className="card-title mb-3">{userData?.userName}</h2>
            <p className="card-text mb-4">{userData?.email}</p>
            <div className="d-flex justify-content-around">
              <div>
                <p className="card-text mb-1"><strong>Role:</strong></p>
                <p className="card-text">{userData?.role}</p>
              </div>
              <div>
                <p className="card-text mb-1"><strong>Status:</strong></p>
                <p className="card-text">{userData?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default UserProfile;
