import React from "react";
import Dashboard from "../pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import ProductAdd from "../components/admin/ProductAdd";
import ProductEdit from "../components/admin/ProductEdit";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products/add" element={<ProductAdd />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
    </Routes>
  );
};

export default AdminRouter;