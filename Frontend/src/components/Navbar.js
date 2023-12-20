import "./navbar.css";
import FastFoodLogo from "../Img/FastFoodLogo.png";
import mypic from "../Img/img.png";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios";
import apiURL from "../services/api";

function Navbar() {
  const { userFirstName } = useUser();
  const { cartItems, updateCartItem } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  const [usertName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const allowedRoutes = [
    `${apiURL}/dashboard`,
    `${apiURL}/adminmenu`,
    `${apiURL}/orders`,
    `${apiURL}/customers`,
    `${apiURL}/settings`,
    `${apiURL}/feedbacks`,
  ];
  const isDashboardRoute = allowedRoutes.includes(location.pathname);
  const navbarClass = isDashboardRoute ? "white-navbar" : "black-navbar";
  const navLinkClass = isDashboardRoute ? "text-dark" : "text-white";
  const adminLinkClass = isDashboardRoute ? "" : "text-white";
  const isUserLoggedIn = true;
  const isAdminLoggedIn = true;

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${apiURL}/auth/userinfo`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserName(response.data.firstName);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Update cartCount whenever cartItems change
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  // User Dropdown (when route is not allowed)
  const showUserDropdown = !isDashboardRoute;

  return (
    <>
      <div className={`row navbar-row1 ${navbarClass}`}>
        <nav className={`navbar navbar-expand-lg ${navbarClass}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
              <img className="logo" src={FastFoodLogo} alt="" />
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
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link !active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About us
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className={`nav-link dropdown-toggle ${
                      isDashboardRoute ? "text-dark" : "text-white"
                    }`}
                    to="/menu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menu List
                  </Link>
                  <ul
                    className={`dropdown-menu ${
                      isDashboardRoute ? "black-text white-bg" : ""
                    }`}
                  >
                    <li>
                      <Link className="dropdown-item" to="/menu">
                        Menu
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/pizzamenu">
                        Pizza Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/burgermenu">
                        Burger Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sandwichmenu">
                        Sandwich Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/chickenmenu">
                        Fried Chicken Menu
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/soupmenu">
                        Soups Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/chowmeinmenu">
                        Chowmein Menu
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/icecreammenu">
                        Ice Cream Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/colddrinkmenu">
                        Cold Drink Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hotdrinkmenu">
                        Hot Drink Menu
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact us
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/reviews">
                    Reviews
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/adminlogin">
                    Admin
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className={`btn ${
                    isDashboardRoute ? "btn-outline-dark" : "btn-outline-light"
                  }`}
                  type="submit"
                >
                  Search
                </button>
              </form>
              {showUserDropdown && (
                <div className="ms-2">
                  <button
                    className={`btn btn-outline-secondary user-dropdown-btn ${
                      isDashboardRoute ? "" : "text-white"
                    }`}
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {isUserLoggedIn ? userFirstName || "User" : "Login"}
                    {isUserLoggedIn && <span className="ms-1"></span>}
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-user ${
                      isDashboardRoute ? "black-text white-bg" : ""
                    }`}
                    aria-labelledby="userDropdown"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "100%",
                    }}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={isUserLoggedIn ? "/logout" : "/login"}
                      >
                        {isUserLoggedIn ? "Logout" : "Login"}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {isDashboardRoute ? (
                <div className="dropdown ms-2">
                  <button
                    className={`btn btn-outline-dark dropdown-toggle dropdown-toggle-admin ${
                      isDashboardRoute ? "" : "text-white"
                    }`}
                    type="button"
                    id="loginDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={mypic}
                      alt="Muhammad Bilal"
                      className="img-fluid"
                      style={{
                        width: "50px",
                        height: "25px",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                    />
                    {isAdminLoggedIn ? "Muhammad Bilal" : "Login"}
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-admin ${
                      isDashboardRoute ? "black-text white-bg" : ""
                    }`}
                    aria-labelledby="loginDropdown"
                    style={{
                      width: "calc(100% + 2px)",
                      marginLeft: "-1px",
                    }}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={isAdminLoggedIn ? "/logout" : "/adminlogin"}
                      >
                        {isAdminLoggedIn ? "Logout" : "Login"}
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/cart" className="shopping-cart position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="position-absolute top-0 start-100 translate-middle badge cart-badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">Cart Items</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
