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
    navigate("/v1/customer/login");
  };

  const settings = () => {
    navigate("/page/settings");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex h-14 justify-between bg-[#FF6F61] px-8 items-center">
      {/* Title */}
      <div className="font-bold text-white text-xl">GrubGo</div>

      {/* Icons */}
      <div className="flex gap-3 items-center relative">
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
        <div className="relative">
          <button
            type="button"
            onClick={toggleCart} // Open cart modal on click
            className="rounded-full h-8 w-8 cursor-pointer font-bold bg-white hover:bg-gray-200 text-[#FF6F61] flex justify-center items-center"
          >
            <Ai.AiOutlineShoppingCart size={18} />
          </button>
          {/* Cart Modal */}
          {isCartOpen && (
            <div className="absolute top-10 right-0 z-50">
              <CartModal onClose={toggleCart} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
