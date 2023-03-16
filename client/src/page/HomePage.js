import React , {useState, useEffect}from 'react';
import Navbar from '../components/Navbar';
import axios from "axios"
import Avatar from "cartoon-avatar"
import "./css/homepage.css"

function HomePage() {
  const [userInfo, setUserInfo] = useState({});
  const avatar = Avatar.generate_avatar()

  useEffect(() => {
    axios.get('http://localhost:5700/api/token').then(response => {
      setUserInfo(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
 

  return (
    <>
      <Navbar/>
      <div className='homepage'>
    <div className='homepage-container' >
          <ul className='home-ul'>
            <li className='home-li'><h1>vous etes connecter : </h1></li>
            <li className='home-li'><img className='home-img' src={avatar} alt="image" /></li>
            <li className='home-li' style={{fontSize: '30px'}}>votre email : {userInfo.email} </li>
            <li className='home-li' style={{fontSize: '30px'}}> votre role: {userInfo.role} </li>
          </ul>
        </div> 
      </div>
    </>
  )
}

export default HomePage