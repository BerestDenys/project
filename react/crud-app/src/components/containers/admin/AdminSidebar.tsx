import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="sidebar col-sm-4 col-md-3 col-lg-2 p-0">
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
              >
                <i className={"bi bi-house-fill"}></i>
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link d-flex align-items-center gap-2"
              >
                <i className={"bi bi-cart"}></i>
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
