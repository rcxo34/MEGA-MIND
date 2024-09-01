import AdminSidebar from "../components/front/adminSidebar"
import { Outlet } from "react-router-dom"
const AdminLayout = () => {
  return (
    <>
        <AdminSidebar />
        <Outlet/>
    </>
  )
}

export default AdminLayout