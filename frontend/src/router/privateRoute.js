import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    console.error("Kullanıcı giriş yapmadı!");
    return <Navigate to="/login" />;
  } else {
    <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;