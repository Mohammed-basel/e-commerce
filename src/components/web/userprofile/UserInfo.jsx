import React, { useContext } from 'react';
import { UserContext } from '../context/User';

export default function UserInfo() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      <h2>{userData.userName}</h2>
      <img
        src={userData.image.secure_url}
        alt=""
        className="img-fluid rounded mb-3"
      />
      <p className="card-text">{userData.status}</p>
    </div>
  );
}