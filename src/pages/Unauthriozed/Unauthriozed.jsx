import React, { useEffect } from "react";
import * as Ai from "react-icons/ai";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
// import { selectCurrentUser } from "../../redux/features/authSlice";

// import logo from "../../assets/WeinsLogo.png";

// import TopBar from '../../layouts/TopBar';
// import MainLayout from '../../layouts/MainLayout';

const Unauthorized = () => {
  // const authUser = useSelector(selectCurrentUser);

  useEffect(() => {
    localStorage.setItem("activepage", "unauthorized");
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/customer/login");
  };

  // const getAuthUser = async () => {
  //   const res = await request(
  //     `v1/user/getuser?userId=${localStorage.getItem('userId')}`,
  //     GET
  //   );
  //   if (!res.error) {
  //     setAuthUser(res[0]);
  //   }
  // };

  // const getAllUnreadCount = async () => {
  //   const res = await request(`v1/message/allunread`, GET);
  //   if (!res.error) {
  //     setAllUnreadCount(res);
  //   }
  // };

  // useEffect(() => {
  //   // getAuthUser();
  //   getAllUnreadCount();
  // }, []);

  return (
    // <MainLayout>
    <div>
      <div className="flex h-full justify-end mb-4 z-50 mt-5 mr-8">
        {/* <div className="flex space-x-2">
          {authUser ? (
            <div className="bg-[#30405D] shadow-md rounded-full h-8 w-8 text-white layout-border flex justify-center items-center">
              {authUser.name.split(" ").length > 1
                ? `${authUser.name.split(" ")[0].charAt(0)}${authUser.name
                    .split(" ")[1]
                    .charAt(0)}`
                : authUser.name.charAt(0)}
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => logout()}
            className="rounded-lg h-8 w-8 cursor-pointer layout-border font-bold bg-red-400 hover:bg-red-600 text-white flex justify-center items-center"
          >
            <Ai.AiOutlineLogout />
          </button>
        </div> */}
      </div>
      <div className="flex h-full w-full justify-center text-center items-center pt-28">
        <div>
          <div>{/* <img src={logo} alt="" /> */}</div>
          <div>
            <p className="text-6xl text-red-600 font-semibold">Unauthorized</p>
            <p className="text-xl font-semibold">
              Please Contact Administration
            </p>
          </div>
        </div>
      </div>
    </div>
    // </MainLayout>
  );
};

export default Unauthorized;
