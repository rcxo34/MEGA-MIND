import {  NavLink } from 'react-router-dom';
import '../../styles/front/styles.css';

const Navbar = () => (
  <nav className="main_navbar">
    <h1>Mega Mind</h1>
    <div className="nav_links">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup"><span className='signup'>Sign Up</span></NavLink>
      
    </div>
  </nav>
);

export default Navbar;
