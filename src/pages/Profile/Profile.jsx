import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import useAxios from "../../util/useAxios";
import { useNavigate } from "react-router-dom";
import httpMethodTypes from "../../constants/httpMethodTypes";
import TopBar from "../../layouts/TopBar";
import Reviews from "./Reviews";

const Profile = () => {
  // const [step, setStep] = useState(1);
  const [currentTab, setCurrentTab] = useState("Pending reviews");
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    allergens: [],
    addresses: [
      {
        buildingNumber: "",
        city: "",
        province: "",
        street: "",
      },
    ],
  });
  const { errorMessage, sendRequest } = useAxios();
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (currentTab) {
      case "Pending reviews":
        return <Reviews />;
      default:
        return <Reviews />;
    }
    // switch (step) {
    //   case 1:
    //     return <AccountDetails payload={payload} setPayload={setPayload} />;
    //   case 2:
    //     return <AllergenDetails payload={payload} setPayload={setPayload} />;
    //   case 3:
    //     return <LocationDetails payload={payload} setPayload={setPayload} />;
    //   default:
    //     return <AccountDetails payload={payload} setPayload={setPayload} />;
    // }
  };

  // const changeStep = (step) => {
  //   // setStep(step);
  // };

  const register = async () => {
    console.log(payload);

    try {
      await sendRequest({
        url: "/v1/v1/customer/register",
        method: httpMethodTypes.POST,
        data: {
          ...payload,
          allergens: payload.allergens.map((allergen) => allergen.value),
        },
      });
      navigate("/v1/customer/login");
    } catch (error) {
      console.error(error);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    console.log(payload);
  }, [payload]);

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
