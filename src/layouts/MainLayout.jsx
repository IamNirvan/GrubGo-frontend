import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import "./layout.css";

const MainLayout = (props) => {
  const { children } = props;
  const today = new Date();
  // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  return (
    <div className="md:flex h-screen w-screen overflow-x-hidden">
      <div className="main-layout z-20">
        <SideBar />
      </div>

      <div className="main-layout-content z-10" style={{ overflowY: "auto" }}>
        <main className=" w-full main-content">
          <div
            className="top-bar  absolute z-30"
            style={{ width: "88%", height: "6.5%" }}
          >
            <div className=" fixed text-xs text-center inset-x-0 bottom-0 font-bold bg-white text-[#062539]">
              {/* © {new Date(selectedYear, 0, 1)} 
              reserved */}
              © {today.getFullYear()} GrubGo. All rights reserved
            </div>
            <TopBar />
            {/* <hr className="h-px  bg-[#55A4F2] border-0 dark:bg-gray-700" /> */}
          </div>

          <div className="pt-12">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
