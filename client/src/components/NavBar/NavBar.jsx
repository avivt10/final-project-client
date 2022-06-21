import "./navbar.css";
import { Link } from "react-router-dom";
import React from "react";

function NavBar(props) {
    return (
      <div className="container-navbar">
        <Link to="/home">
          <button className="home button">עמוד בית</button>
        </Link>
        <Link to="/register">
          <button className="register button">הרשמה</button>
        </Link>
        <Link to="/login">
          <button className="login button">התחברות</button>
        </Link>
        <Link to="/delete">
          <button className="home button">מחק משתמש </button>
        </Link>
      </div>
    );
  }
  
  export default NavBar;
  