import React, { useContext } from 'react';
import { UserContext } from '../context/User';

export default function UserInfo() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p className="text-center">...Loading</p>;
  }

  return (
    <div className="container mt-5 vh-100">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{userData.userName}</h2>
          <img
            src={userData.image.secure_url}
            alt={userData.userName}
            className="img-fluid rounded mb-3"
          />
          <p className="card-text">{userData.status}</p>
        </div>
      </div>
    </div>
  );
}
