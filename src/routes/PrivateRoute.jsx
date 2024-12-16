import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/authSlice";

const determineLoginURL = (userType) => {
  if (String(userType).toLowerCase === "customer") {
    return "/customer/login";
  }

  if (String(userType).toLowerCase === "admin") {
    return "/admin/login";
  }
};

const PrivateRoute = ({ userType }) => {
  const loginURL = determineLoginURL(userType);
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to={loginURL} />;
};

export default PrivateRoute;
