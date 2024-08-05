import { Outlet } from "react-router-dom"
import FrontNavbar from "../components/front/FrontNavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/front/Footer";

const FrontLayout = () => {
  return (
    <>
    <FrontNavbar />
    <Outlet/>
    <ToastContainer />
    <Footer />
    </>

  )
}

export default FrontLayout