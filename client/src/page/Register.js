import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/register.css"

const initialstate = {
   prenom: "", 
   nom: "", 
   email: "",
   password: ""
}

function Register() {
  const [formData, setFormData ] = useState(initialstate)
  const [comfirmPassword, setComfirmPassword ] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault()
      if (formData.password !== comfirmPassword) {
        // Si les mots de passe ne correspondent pas, afficher une erreur ou empêcher la soumission du formulaire
        alert("Les mots de passe ne correspondent pas");
        return;
      }else {
        const response = await axios.post("http://localhost:5700/api/register", formData);
        console.log(response.data);
        navigate("/home")
      }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setComfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleLogin = () => {
    navigate("/")
  }
  return (
    <div className='register'>
    <div className='register-container'>  
        <form className='register-form' onSubmit={handleSubmit}>
            <h1 className='register-title'>Crée un compte</h1>
            <label className='register-label'>Prenom</label>
           <input className='register-input' placeholder='entez votre prenom' name='prenom'
           type="text" onChange={handleChange} />
           <label className='register-label'>Nom</label>
           <input className='register-input' placeholder='entez votre nom' name='nom'
           type="text" onChange={handleChange} />
           <label className='register-label'>email</label>
           <input className='register-input' placeholder='entez votre email' name='email'
           type="email" onChange={handleChange} />
           <label className="register-label">Mot de Passe</label>
           <input className='register-input' placeholder='entre votre mot de passe' name='password'
            type="password" handleChange={handleChange}/>
            <label className="register-label"> Comfirmer Mot de Passe</label>
           <input className='register-input' placeholder='comfirmer votre mot de passe' name='confirmPassword'
            type="password" handleChange={handleChange}/>
           <button className='register-btn' type="submit">enregister</button> 
           <div className='register-footer'>
            <div className='register-footer-text'>
              <p>Vous avez  un compte : <i className='register-footer-item' onClick={handleLogin}>clicker ici</i></p>
            </div>
           </div>
        </form>
        </div> 
    </div>
  )
}

export default Register