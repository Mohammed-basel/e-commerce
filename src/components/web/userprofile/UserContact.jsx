import React, { useContext } from 'react';
import { UserContext } from '../context/User';

export default function UserContact() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      <h2>{userData.email}</h2>
      <p>{userData.phone}</p>
    </div>
  );
}