import React, { useContext } from 'react';
import { UserContext } from '../context/User';

export default function UserContact() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p className="text-center">...Loading</p>;
  }

  return (
    <div className="container mt-5 vh-100">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{userData.email}</h2>
          <p className="card-text">{userData.phone}</p>
        </div>
      </div>
    </div>
  );
}
