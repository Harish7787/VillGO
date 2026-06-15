import React from 'react'
import Dashboard from '../pages/Dashboard'

const adminRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
};

export default adminRouter;