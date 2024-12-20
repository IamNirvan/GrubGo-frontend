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
      <div
        className="top-bar  absolute z-30"
        style={{ width: "100%", height: "6.5%" }}
      >
        <TopBar />
      </div>
      <div className="main-layout z-20">
        <SideBar />
      </div>

      <div className="main-layout-content z-10" style={{ overflowY: "auto" }}>
        <main className=" w-full main-content">
          {/* <div
            className="top-bar  absolute z-30"
            style={{ width: "88%", height: "6.5%" }}
          >
            <TopBar />
          </div> */}

          <div className="pt-12">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
