import React, { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserType,
  setUserInfo,
} from "../redux/features/authSlice";
import httpMethodTypes from "../constants/httpMethodTypes";
import useAxios from "../util/useAxios";
import ImageLeft from "./Order food-pana.png";
import "@fontsource/poppins";
import userTypes from "../constants/userTypes";

const Login = ({ userType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { errorMessage, sendRequest } = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("customer");

  const login = async () => {
    try {
      const result = await sendRequest({
        url: `/v1/account/${selectedOption}/login`,
        method: httpMethodTypes.POST,
        data: input,
      });

      dispatch(setToken(result.data.token));
      dispatch(setUserInfo(result.data.userInfo));
      if (
        selectedOption === userTypes.EMPLOYEE ||
        userType === userTypes.EMPLOYEE
      ) {
        dispatch(setUserType(userTypes.EMPLOYEE));
        navigate("/v1/dishes");
      } else {
        dispatch(setUserType(userTypes.CUSTOMER));
        navigate("/v1/customer/dishes");
      }
    } catch (error) {
      if (error.status === 401) {
        toast.error("Please enter valid user credentials");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const onChange = (e) => {
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleEnterKeypress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    localStorage.setItem("activepage", "login");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white font-[Poppins]">
      <div className="flex w-full max-w-7xl overflow-hidden">
        <div className="w-[50%] flex items-center justify-start">
          <img
            src={ImageLeft}
            alt="Illustration"
            className="h-auto max-h-[100%]"
          />
        </div>

        <div className="w-[50%] p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-7">
              Log into your account
            </h2>
            <div className="flex items-center mb-[60px] gap-3">
              {/* <button className="w-auto h-auto bg-[#f1f1f1] py-[10px] px-[15px] rounded-[4px]"> */}
              <button
                className={`${
                  selectedOption === "customer"
                    ? "bg-[#FFBBB2] text-[#FF725E] border-[#FF725E]"
                    : "bg-[#EAEAEA] text-[#B0B0B0] border-[#B0B0B0]"
                } w-auto h-auto py-[10px] px-[15px] rounded-[4px] border-[1px]`}
                onClick={() => {
                  setSelectedOption("customer");
                  userType = userTypes.CUSTOMER;
                }}
              >
                Customer
              </button>
              {/* <button className="w-auto h-auto bg-[#f1f1f1] py-[10px] px-[15px] rounded-[4px]"> */}
              <button
                className={`${
                  selectedOption === "employee"
                    ? "bg-[#FFBBB2] text-[#FF725E] border-[#FF725E]"
                    : "bg-[#EAEAEA] text-[#B0B0B0] border-[#B0B0B0]"
                } w-auto h-auto py-[10px] px-[15px] rounded-[4px] border-[1px]`}
                onClick={() => {
                  setSelectedOption("employee");
                  userType = userTypes.EMPLOYEE;
                }}
              >
                Employee
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-[16px] font-semibold text-gray-600 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  onChange={onChange}
                  value={input.username}
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border rounded-lg text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF725E]"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-[16px] font-semibold text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={onChange}
                  onKeyPress={handleEnterKeypress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF725E]"
                />
                {/* <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <div className="flex items-center h-full">
                    {showPassword ? (
                      <FaEye
                        className="text-gray-600 cursor-pointer pointer-events-auto"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="text-gray-600 cursor-pointer pointer-events-auto"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div> */}
              </div>
            </div>
            <button
              onClick={login}
              className="w-full mt-8 py-3 bg-[#FF725E] text-[16px] text-white font-bold rounded-lg hover:bg-[#FF725E] focus:outline-none focus:ring-2 focus:ring-[#FF725E]"
            >
              Login
            </button>
            {selectedOption === userTypes.CUSTOMER && (
              <p className="mt-6 text-center text-[14px] text-gray-600">
                Don't have an account?{" "}
                <a href="/v1/customer/register" className="font-semibold">
                  Register
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
