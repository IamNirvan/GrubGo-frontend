import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/authSlice";
import userTypes from "../constants/userTypes";

const determineLoginURL = (userType) => {
  if (userType === userTypes.CUSTOMER) {
    return "/customer/login";
  }

  if (userType === userTypes.EMPLOYEE) {
    return "/employee/login";
  }
};

const PrivateRoute = ({ userType }) => {
  const loginURL = determineLoginURL(userType);
  console.log(userType, loginURL);

  const token = useSelector(selectCurrentToken);
  console.log("token", token);
  return token ? <Outlet /> : <Navigate to={loginURL} />;
};

export default PrivateRoute;
