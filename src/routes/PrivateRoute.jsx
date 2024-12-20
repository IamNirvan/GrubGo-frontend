import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/authSlice";
import userTypes from "../constants/userTypes";

// const determineLoginURL = (userType) => {
//   if (userType === userTypes.CUSTOMER) {
//     return "/v1/customer/login";
//   }

//   if (userType === userTypes.EMPLOYEE) {
//     return "/v1/employee/login";
//   }
// };

const PrivateRoute = ({ userType }) => {
  // const loginURL = determineLoginURL(userType);
  return useSelector(selectCurrentToken) ? (
    <Outlet />
  ) : (
    <Navigate to="/v1/login" />
  );
};

export default PrivateRoute;
