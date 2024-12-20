import React, { useState } from "react";
import "./layout.css";
import {
  AiFillShopping,
  AiFillSetting,
  AiOutlineLogout,
  AiFillProfile,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CartModal from "../components/CartModal";
import "@fontsource/poppins";
import { selectUserType } from "../redux/features/authSlice";
import { useSelector } from "react-redux";
import userTypes from "../constants/userTypes";

const TopBar = () => {
  const userType = useSelector(selectUserType);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/v1/login");
  };

  const settings = () => {
    navigate("/v1/customer/profile");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex h-14 justify-between bg-[#FF6F61] px-[45px] items-center font-[Poppins]">
      {/* Title */}
      <div className="font-bold text-white text-xl">GrubGo</div>

      {/* Icons */}
      <div className="flex gap-3 items-center relative">
        {userType === userTypes.CUSTOMER && (
          <button
            type="button"
            onClick={settings}
            className="h-full min-h-14 w-[100px] p-[5px] cursor-pointer font-bold bg-[#FF6F61] text-[#fff] flex justify-center items-center hover:bg-[#e74732] transition-all duration-300"
          >
            <div className="flex flex-row w-auto h-auto items-center gap-[10px] text-[14px]">
              <AiFillSetting size={18} color="#fff" />
              <p>Profile</p>
            </div>
          </button>
        )}
        <button
          type="button"
          onClick={logout}
          className="h-full min-h-14 w-[100px] p-[5px] cursor-pointer font-bold bg-[#FF6F61] text-[#fff] flex justify-center items-center  hover:bg-[#e74732] transition-all duration-300"
        >
          <div className="flex flex-row w-auto h-auto items-center gap-[10px] text-[14px]">
            <AiOutlineLogout size={18} color="#fff" />
            <p>Logout</p>
          </div>
        </button>
        {userType === userTypes.CUSTOMER && (
          <button
            type="button"
            onClick={toggleCart}
            className="h-full min-h-14 w-[100px] p-[5px] cursor-pointer font-bold bg-[#FF6F61] text-[#fff] flex justify-center items-center  hover:bg-[#e74732] transition-all duration-300"
          >
            <div className="flex flex-row w-auto h-auto items-center gap-[10px] text-[14px]">
              <AiFillShopping size={18} color="#fff" />
              <p>Cart</p>
            </div>
          </button>
        )}
        {/* Cart Modal */}
        {isCartOpen && (
          <div className="absolute top-12 right-0 z-50">
            <CartModal onClose={toggleCart} />
          </div>
        )}

        {/* </div> */}
      </div>
    </div>
  );
};

export default TopBar;
