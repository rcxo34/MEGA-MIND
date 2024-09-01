import {  NavLink } from 'react-router-dom';
import '../../styles/front/styles.css';

const Navbar = () => (
  <nav className="w-full max-w-[1224px] text-2xl bg-[#172554] rounded-lg p-[10px_20px] overflow-hidden flex items-center justify-between absolute top-3 left-1/2 transform -translate-x-1/2 text-white  font-sofia">
    <h1 className="font-bold text-2xl font-sofia">Mega Mind</h1>
    <div className="flex space-x-4  font-sofia">
      <NavLink to="/" className="hover:bg-blue-400 rounded-2xl p-2 font-sofia">Home</NavLink>
      <NavLink to="/about" className="hover:bg-blue-400 rounded-2xl p-2 font-sofia">About</NavLink>
      <NavLink to="/contact" className="hover:bg-blue-400 rounded-2xl p-2 mr-6 font-sofia">Contact</NavLink>
      <NavLink to="/login" className="hover:bg-blue-400 rounded-2xl p-2 font-sofia">Login</NavLink>
      <NavLink to="/signup" className="hover:bg-blue-400 rounded-2xl p-2 pl-4 pr-4 bg-blue-300 text-blue-950  font-sofia"><span className='signup font-sofia'>Sign Up</span></NavLink>
      
    </div>
  </nav>
);

export default Navbar;
