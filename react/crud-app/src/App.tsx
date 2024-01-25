import { Route, Routes } from "react-router-dom";
import ProductListPage from "./components/products/list/types";
import AdminLayout from "./components/containers/admin/AdminLayout";
import ProductCreatePage from "./components/products/create/ProductCreatePage";
import ProductDeletePage from "./components/products/delete/ProductDeletePage";
import ProductEditPage from "./components/products/edit/ProductEditPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="page/:page" element={<ProductListPage />} />
          <Route path="create" element={<ProductCreatePage />} />
          <Route path="edit">
            <Route path=":id" element={<ProductEditPage />} />
          </Route>
          <Route path="delete">
            <Route path=":id" element={<ProductDeletePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
