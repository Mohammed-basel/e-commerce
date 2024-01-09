import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { CartContext } from "../context/Cart";
import {FaUser,FaSignInAlt,FaSignOutAlt,FaHome,FaList,FaBox,FaShoppingCart} from "react-icons/fa";

export default function Navbar() {
  let { userToken, setUserToken, userData, setUserData } =
    useContext(UserContext);

  const { count } = useContext(CartContext);

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark text-light text-center p-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          M-shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                <FaHome /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AllCategories">
                <FaList /> Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allproducts">
                <FaBox /> Products
              </Link>
            </li>
            {userToken ? (
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  <FaShoppingCart /> Cart
                  {count > 0 && (
                    <span className="badge bg-secondary ms-1">{count}</span>
                  )}
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userData != null ? userData.userName : "Account"}
              </a>
              <ul className="dropdown-menu">
                {userToken == null ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/Register">
                        <FaUser /> Register
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signIn">
                        <FaSignInAlt /> Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/userprofile">
                        <FaUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logout}>
                        <FaSignOutAlt /> Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
