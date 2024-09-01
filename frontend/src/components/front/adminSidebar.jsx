import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/user/dashboard.css';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { FaBook, FaCircleQuestion, FaCubesStacked, FaHouse, FaRightFromBracket, FaMessage, FaChartSimple, FaPeopleGroup } from 'react-icons/fa6';
import { FaBookOpen, FaCertificate } from 'react-icons/fa';

const adminSidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'font-sans bg-black w-full font-bold text-blue-400 hover:bg-gray-900 hover:text-blue-400 rounded-md px-3 py-2 flex item-center font-sofia'
      : 'font-sans text-black w-full hover:bg-gray-900 hover:font-bold hover:text-blue-300 rounded-md px-3 py-2 flex font-sofia';

  const iconClass = ({ isActive }) => 
    isActive
      ? 'bg-blue-300 text-2xl mr-8'
      : 'bg-black text-2xl mr-8'
      
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
    <nav className="hidden sm:w-[296px] bg-blue-300 text-black sm:flex flex-col pt-5 min-h-screen p-4">
      <h1 className='text-2xl font-extrabold text-blue-950 text-center font-sofia mb-10 mt-8'>Mega Mind</h1>
      <ul className="text-xl space-y-2 flex flex-col flex-grow">
        <NavLink to="/user/home" className={linkClass}>
          <FaHouse className={iconClass} style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
          Home
        </NavLink>

        <NavLink to="/user/articles" className={linkClass}>
          <FaBook className={iconClass} style={{fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
          Articles
        </NavLink>

        <NavLink to="/user/questions" className={linkClass}>
        <FaCircleQuestion className={iconClass} style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
          Quiz
        </NavLink>

        <NavLink to="/user/curriculum" className={linkClass}>
          <FaCubesStacked className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
          Curriculum
        </NavLink>

          {/* <NavLink to="/" onClick={handleLogout} className={linkClass}>
            <FaRightFromBracket className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
            Logout
          </NavLink> */}

          <NavLink to="/user/materials" className={linkClass}>
            <FaBookOpen className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
            Materials
          </NavLink>

          

          <NavLink to="/user/community" className={linkClass}>
            <FaPeopleGroup className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
            Community
          </NavLink>

          <NavLink to="/user/certificate" className={linkClass}>
            <FaCertificate className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
            Certificate
          </NavLink>

          <NavLink to="/user/support" className={linkClass}>
            <FaMessage className={iconClass}  style={{ fontSize: '20', marginRight:'8px', marginTop:'4px' }}/>
            Support
          </NavLink>

      </ul>
    </nav>
  );
};



export default adminSidebar;
