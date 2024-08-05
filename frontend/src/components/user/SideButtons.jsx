import { FaCircleUser, FaBell, FaPowerOff } from 'react-icons/fa6';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useState } from 'react';

const SideButtons = () => {

  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the component visibility
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to move out of Mega Mind?")) {
      alert('Logged out successfully, hope to see you soon again!');
      logout();
      navigate('/');
    }
  };
  
  return (
    <div>
        <button  onClick={handleButtonClick} >
          <FaCircleUser style={{ color: '#172554', fontSize: '32', position:'absolute', top: '24px', right: '48px'}}/>
        </button>

        <button>
          <FaBell style={{ color: '#172554', fontSize: '32', position:'absolute', top: '24px', right: '96px'}} />
        </button> 

        <button onClick={handleLogout}>
          <FaPowerOff style={{ color: '#172554', fontSize: '32', position:'absolute', top: '24px', right: '144px'}}/>
        </button>

        {isVisible && <Profile />}
  </div>
  )
}

export default SideButtons