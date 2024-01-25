import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: (v: any) => {
      // navigate(`?search=${v.search}`);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <Link className="navbar-brand" to=".">
              Панель керування
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0"></ul>
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  id="search"
                  value={values.search}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default AdminHeader;
