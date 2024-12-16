import React, { useState } from "react";
import "./layout.css";
import * as Ai from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CartModal from "../components/CartModal";

const TopBar = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/customer/login");
  };

  const settings = () => {
    navigate("/page/settings");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex h-14 justify-between bg-[#FF6F61] px-8 items-center">
      {/* Title */}
      <div className="font-bold text-white text-xl">GrubGo</div>

      {/* Menu Items */}
      {/* <div className="flex gap-4 items-center">
        <span
          className={
            window.location.pathname !== "/page/vehicles"
              ? "hidden"
              : "visible text-white"
          }
        >
          Vehicles
        </span>
        <span
          className={
            window.location.pathname !== "/page/dealertrade"
              ? "hidden"
              : "visible text-white"
          }
        >
          Dealer Trade
        </span>
        <span
          className={
            window.location.pathname !== "/page/division"
              ? "hidden"
              : "visible text-white"
          }
        >
          Division
        </span>
        <span
          className={
            window.location.pathname !== "/page/bulkprint"
              ? "hidden"
              : "visible text-white"
          }
        >
          Bulk Print
        </span>
        <span
          className={
            window.location.pathname !== "/page/printbystock"
              ? "hidden"
              : "visible text-white"
          }
        >
          Print By Stock
        </span>
        <span
          className={
            window.location.pathname !== "/page/reportbyday"
              ? "hidden"
              : "visible text-white"
          }
        >
          Daily Received
        </span>
        <span
          className={
            window.location.pathname !== "/page/reportbymonth"
              ? "hidden"
              : "visible text-white"
          }
        >
          Monthly Received
        </span>
        <span
          className={
            window.location.pathname !== "/page/singlestockchange"
              ? "hidden"
              : "visible text-white"
          }
        >
          Single Stock Number Edit
        </span>
        <span
          className={
            window.location.pathname !== "/page/bulkstockchange"
              ? "hidden"
              : "visible text-white"
          }
        >
          Bulk Stock Number Edit
        </span>
        <span
          className={
            window.location.pathname !== "/page/settings"
              ? "hidden"
              : "visible text-white"
          }
        >
          Settings
        </span>
      </div> */}

      {/* Icons */}
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={settings}
          className="rounded-full h-8 w-8 cursor-pointer font-bold bg-white hover:bg-gray-200 text-[#FF6F61] flex justify-center items-center"
        >
          <Ai.AiFillSetting size={18} />
        </button>
        <button
          type="button"
          className="rounded-full h-8 w-8 cursor-pointer font-bold bg-white hover:bg-gray-200 text-[#FF6F61] flex justify-center items-center"
          onClick={logout}
        >
          <Ai.AiOutlineLogout size={18} />
        </button>
        <button
          type="button"
          onClick={toggleCart} // Open cart modal on click
          className="rounded-full h-8 w-8 cursor-pointer font-bold bg-white hover:bg-gray-200 text-[#FF6F61] flex justify-center items-center"
        >
          <Ai.AiOutlineShoppingCart size={18} />
        </button>
      </div>
      {/* Cart Modal */}
      {isCartOpen && <CartModal onClose={toggleCart} />}
    </div>
  );
};

export default TopBar;
