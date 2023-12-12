import React, { useContext } from "react";
import { UserContext } from "./../context/User";
import style from "./UserProfile.module.css";
import { Link, Outlet } from "react-router-dom";

export default function UserProfile() {
  const { userData, loading } = useContext(UserContext);
  if (loading) {
    return <p>...Loading</p>;
  }
  console.log(userData);
  return (
    <aside className={`${style.profile}`}>
      <div className={`${style.profileLinks}`}>
        <nav>
          <Link to="">Info</Link>
          <Link to="contact">Contact</Link>
          <Link to="orders">Order history</Link>
        </nav>
      </div>

      <div className={`${style.userData}`}>
        <Outlet />
      </div>
    </aside>
  );
}
