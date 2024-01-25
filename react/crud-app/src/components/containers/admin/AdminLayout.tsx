import "./admin.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className="admin container">
        <div className="row">
          <AdminSidebar></AdminSidebar>
          <main className="col-sm-8 col-md-9 col-lg-10 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
