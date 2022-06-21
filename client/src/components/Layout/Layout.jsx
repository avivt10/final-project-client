import React from 'react';
import Home from '../Home/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../Login/Login";
import NavBar from '../NavBar/NavBar.jsx';
import Register from '../Register/Register';
import PersonalPage from '../PersonalDetails/PersonalPage'
import Delete from '../Delete/Delete'
import "./layout.css";

function Layout(props) {
    return (
        <Router>
        <div className="container">
          <nav>
          <NavBar></NavBar>
          </nav>
          
          <main >
          <Routes>
            <Route path="/personalPage" element={<PersonalPage />}></Route> 
            <Route path="/home" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/delete" element={<Delete />}></Route>
          </Routes>
        </main>
        
        <footer></footer>
      </div>
    </Router>
    );
}

export default Layout;