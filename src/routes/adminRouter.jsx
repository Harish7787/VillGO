// import React from "react";
// import Dashboard from "../pages/Dashboard";
// import { Routes, Route } from "react-router-dom";
// import ProductAdd from "../components/admin/ProductAdd";
// import ProductEdit from "../components/admin/ProductEdit";
// import ProductTable from "../components/admin/ProductTable";

// const AdminRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/products" element={<ProductTable />} />
//       <Route path="/products/add" element={<ProductAdd />} />
//       <Route path="/products/edit/:id" element={<ProductEdit />} />
//     </Routes>
//   );
// };

// export default AdminRouter;

import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import ProductTable from "../components/admin/ProductTable";
import ProductAdd from "../components/admin/ProductAdd";
import ProductEdit from "../components/admin/ProductEdit";

export default function AdminRouter() {
  return (
    <Routes>

      <Route element={<AdminLayout />}>

        <Route index element={<Dashboard />} />

        <Route
          path="products"
          element={<ProductTable />}
        />

        <Route
          path="products/add"
          element={<ProductAdd />}
        />

        <Route
          path="products/edit/:id"
          element={<ProductEdit />}
        />

<Route path="users" element={<Dashboard />} />
      </Route>
      
    </Routes>
  );
}