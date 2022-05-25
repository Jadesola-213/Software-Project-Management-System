import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return "";
  }

  return (
    <nav
      style={{
        padding: "1.5rem",
        backgroundColor: '#485461',
backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
      }}
      className="navbar"
    >
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard">Project Management</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
