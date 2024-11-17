import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import * as Tb from "react-icons/tb";
import * as Bi from "react-icons/bi";
import * as Io from "react-icons/io5";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import * as Fa from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/authSlice";

const SideBar = () => {
  const [isSubmenuVisible, setSubmenuVisibility] = useState(false);
  const toggleSubmenu = () => {
    setSubmenuVisibility(!isSubmenuVisible);
  };

  const [isSubmenuVisible2, setSubmenuVisibility2] = useState(false);
  const toggleSubmenu2 = () => {
    setSubmenuVisibility2(!isSubmenuVisible2);
  };
  const authUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (
      window.location.pathname === "/page/reportbyday" ||
      window.location.pathname === "/page/reportbymonth"
    ) {
      setSubmenuVisibility(true);
    }
    if (
      window.location.pathname === "/page/bulkstockchange" ||
      window.location.pathname === "/page/singlestockchange"
    ) {
      setSubmenuVisibility2(true);
    }
  }, []);

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex justify-center items-center h-14 bg-[#FF6F61]" />
      <div className="h-[75%]">
        <nav className="mt-2 px-2 space-y-2">
          <NavLink
            to="/page/dishes"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive ? "bg-[#FF6F61] text-white" : "hover:bg-[#FF6F61]"
              }`
            }
          >
            <Io.IoCarSportOutline className="text-[18px] mr-2" />
            <span>Dishes</span>
          </NavLink>

          <NavLink
            to="/page/rules"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive ? "bg-[#FF6F61] text-white" : "hover:bg-[#FF6F61]"
              }`
            }
          >
            <Bs.BsPrinter className="text-[18px] mr-2" />
            <span>Rules</span>
          </NavLink>

          {/* <NavLink
            to="/page/printbystock"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive ? "bg-[#FF6F61] text-white" : "hover:bg-[#FF6F61]"
              }`
            }
          >
            <Ri.RiPrinterCloudLine className="text-[19px] mr-2" />
            <span>Print By Stock</span>
          </NavLink> */}

          <div
            className={`${
              isSubmenuVisible ? "bg-[#FF6F61] rounded-lg text-white" : ""
            }`}
          >
            {/* <button
              className="flex items-center p-2 rounded-lg w-full"
              onClick={toggleSubmenu}
              type="button"
            >
              <Tb.TbReportSearch className="text-[22px] mr-2" />
              <span className="flex-1 text-left">Report</span>
              <Fa.FaChevronDown
                className={`text-[12px] transition-transform ${
                  isSubmenuVisible ? "rotate-180" : ""
                }`}
              />
            </button>
            {isSubmenuVisible && (
              <ul className="submenu pl-4">
                <li className="mb-1 mt-1">
                  <NavLink
                    to="/page/reportbyday"
                    className="flex items-center p-1 hover:bg-[#6DB0F2] rounded-md"
                  >
                    <Tb.TbReport className="text-[20px] mr-2" />
                    <span>Daily Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/page/reportbymonth"
                    className="flex items-center p-1 hover:bg-[#6DB0F2] rounded-md"
                  >
                    <Tb.TbReportAnalytics className="text-[20px] mr-2" />
                    <span>Monthly Report</span>
                  </NavLink>
                </li>
              </ul>
            )} */}
          </div>
        </nav>
      </div>
      <div className="p-2 h-[10%] mt-8">{/* Optional footer or logo */}</div>
    </div>
  );
};

export default SideBar;
