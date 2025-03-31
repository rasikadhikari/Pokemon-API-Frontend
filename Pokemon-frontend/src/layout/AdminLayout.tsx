import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulate loading for better state handling
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!context?.auth.token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
