import { Link } from 'react-router-dom';
import '../../styles/user/dashboard.css';
import AuthContext from '../../context/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getToken } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



    return(
  <>
    <header className="navbar">
      <h1>Dashboard</h1>
      <div className='button_holder'>

        <button onClick={toggleSidebar} className="open_sidebar_button">Open Sidebar</button>
      </div>
    </header>
    <section className="content">
      {/* Other content here */}
    </section>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />  
  </>

    )  		
}

export default Navbar;
