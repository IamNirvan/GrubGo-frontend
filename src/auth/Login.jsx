import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/authSlice";
import { POST, request } from "../api/ApiAdapter";
import { useAuth } from "../context/authContext";
import ImageLeft from "./Order food-pana.png";

const Login = () => {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    const result = await request("auth/login", POST, input);

    if (!result.error) {
      localStorage.setItem("token", result.token.toString());
      dispatch(setCredentials(result));
      setAuth(true);
      navigate("/page/vehicles");
    } else {
      toast.error(result.error.response.data);
      if (result.error.response.status === 406) {
        toast.error("Please enter valid user credentials");
      } else {
        toast.error(result.error.response.data.message);
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-4/5 max-w-4xl">
        {/* Left Side Illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          {/* Replace the div below with an image or illustration component */}
          <div className="flex items-center justify-center p-8">
            {/* Placeholder illustration */}
            <img src={ImageLeft} alt="Illustration" className="h-96" />
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Log into your account
          </h2>

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                onChange={onChange}
                value={input.username}
                type="text"
                placeholder="Enter Username"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
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
                placeholder="Enter Password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? (
                  <FaEye
                    className="cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full mt-8 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/page/register" className="text-red-500 font-semibold">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
