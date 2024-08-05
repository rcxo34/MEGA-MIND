import { Outlet } from "react-router-dom";
import UserSidebar from '../components/user/UserSidebar';
import UserNavbar from "../components/user/UserNavbar";
import UserContent from "../components/user/UserContent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/user/dashboard.css';
import SideButtons from "../components/user/SideButtons";

const UserLayout = () => {
  return (
    <>
        <div className="w-full flex">
            <UserSidebar />
            <div className="w-full flex flex-col pt-2">
              {/* <UserNavbar /> */}
              <Outlet/>
              <ToastContainer />
              <SideButtons />
            </div>

        </div>
        
    </>
  )
}

export default UserLayout