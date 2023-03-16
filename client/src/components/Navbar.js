import React from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./css/navbar.css"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.post("http://localhost:5700/api/logout")
    .then(res => res.message , navigate("/"))
    .catch(err => console.log(err))
  };
  
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <div className='nav-champ1' >
          <h1 className='nav-title'>Login Complet</h1>,
        </div>
        <div className='nav-champ2'>
          <button className='nav-btn' onClick={handleLogout}>se deconnecter</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar