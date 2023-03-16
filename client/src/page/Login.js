import React, { useState } from 'react'
import {useNavigate } from "react-router-dom"
import axios from 'axios'
import "./css/login.css"

const initiaState = {
  email: "", 
  password: ""
}

function Login() {
  const [formdata, setFormData] = useState(initiaState)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:5700/api/login", formdata)
     .then(res => res.data.message, navigate('/home'))
     .catch(error => console.log(error))
    
  }

  const handleChange = (e) => {
    setFormData({...formdata, [e.target.name]: e.target.value})
  }

  const handleregister = () => {
    navigate("/register")
  }
  return (
    <div className='login'>
        <div className='login-container'>  
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-title'>Connexion</h1>
               <label className='login-label'>email</label>
               <input className='login-input' placeholder='entez votre email' name='email'
               type="email" onChange={handleChange} value={formdata.email}/>
               <label className="login-label">Mot de Passe</label>
               <input className='login-input' placeholder='entre votre mot de passe' name='password'
                type="password" onChange={handleChange} value={formdata.password}/>
               <button className='login-btn' type="submit">Se connecter</button> 
               <div className='login-footer'>
                <div className='login-footer-text'>
                  <p>Vous n'avez pas de compte : <i className='login-footer-item' onClick={handleregister}>clicker ici</i></p>
                </div>
                <div className='login-footer-subtext'>
                  <p>mot de passe oublier</p>
                </div>
               </div>
            </form>
            </div> 
        </div>
  )
}

export default Login