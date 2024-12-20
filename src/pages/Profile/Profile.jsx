import React, { useState } from "react";
import "@fontsource/poppins";
import TopBar from "../../layouts/TopBar";
import Reviews from "./Reviews";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("Pending reviews");

  const renderStep = () => {
    switch (currentTab) {
      case "Pending reviews":
        return <Reviews />;
      default:
        return <Reviews />;
    }
  };

  return (
    <div>
      <TopBar />
      <div className="h-screen w-screen flex bg-bg-white">
        {/* Sidebar */}
        <div className="w-[25%] flex justify-center bg-gray-100">
          <div className="w-[80%] mt-[100px] flex">
            <ul className="w-full">
              <li
                onClick={() => setCurrentTab("Pending reviews")}
                className={`border-0 rounded-[4px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
                  currentTab === "Pending reviews"
                    ? "bg-bg-accent text-fg-activated text-[20px]"
                    : "text-fg-deactivated"
                }`}
              >
                Pending reviews
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center pt-[100px]">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
