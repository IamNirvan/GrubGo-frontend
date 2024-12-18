import React, { useState, useEffect } from "react";
import AccountDetails from "./AccountDetails";
import AllergenDetails from "./AllergenDetails";
import LocationDetails from "./LocationDetails";
import "@fontsource/poppins";
import styles from "./formStyles.module.css";
import useAxios from "../../util/useAxios";
import { useNavigate } from "react-router-dom";
import httpMethodTypes from "../../constants/httpMethodTypes";

const Register = () => {
  const [step, setStep] = useState(1);
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
    switch (step) {
      case 1:
        return <AccountDetails payload={payload} setPayload={setPayload} />;
      case 2:
        return <AllergenDetails payload={payload} setPayload={setPayload} />;
      case 3:
        return <LocationDetails payload={payload} setPayload={setPayload} />;
      default:
        return <AccountDetails payload={payload} setPayload={setPayload} />;
    }
  };

  const changeStep = (step) => {
    setStep(step);
  };

  const register = async () => {
    console.log(payload);

    try {
      await sendRequest({
        url: "/v1/customer/register",
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

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  //     <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
  //       <div className="mb-4">
  //         <h1 className="text-2xl font-bold">Create an account</h1>
  //       </div>
  //       <div className="flex">
  //         <div className="w-1/4">
  //           <ul>
  //             <li
  //               className={`py-2 px-4 ${
  //                 step === 1 ? "bg-red-500 text-white" : ""
  //               }`}
  //             >
  //               Account details
  //             </li>
  //             <li
  //               className={`py-2 px-4 ${
  //                 step === 2 ? "bg-red-500 text-white" : ""
  //               }`}
  //             >
  //               Allergens
  //             </li>
  //             <li
  //               className={`py-2 px-4 ${
  //                 step === 3 ? "bg-red-500 text-white" : ""
  //               }`}
  //             >
  //               Location
  //             </li>
  //           </ul>
  //         </div>
  //         {/* <div className="w-3/4 pl-4">{renderStep()}</div> */}
  //       </div>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100 font-[Poppins]">
  //     {/* Left Sidebar */}
  //     <div className="w-[30%] h-full min-h-screen bg-red-200 flex justify-center">
  //       <div className="w-[80%] mt-[100px] flex">
  //         <ul className="w-full">
  //           <li
  //             className={`border-0 rounded-[8px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
  //               step === 1
  //                 ? "bg-bg-accent text-fg-activated text-[20px]"
  //                 : "text-fg-deactivated"
  //             }`}
  //           >
  //             Account details
  //           </li>
  //           <li
  //             className={`border-0 rounded-[8px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
  //               step === 2
  //                 ? "bg-bg-accent text-fg-activated text-[20px]"
  //                 : "text-fg-deactivated"
  //             }`}
  //           >
  //             Allergens
  //           </li>
  //           <li
  //             className={`border-0 rounded-[8px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
  //               step === 3
  //                 ? "bg-bg-accent text-fg-activated text-[20px]"
  //                 : "text-fg-deactivated"
  //             }`}
  //           >
  //             Location
  //           </li>
  //         </ul>
  //       </div>
  //     </div>

  //     {/* Right Content Area */}
  //     <div className="w-[70%] h-[100%] min-h-screen flex flex-col justify-between items-center pt-[100px] bg-blue-100">
  //       <div className="bg-yellow-100 w-full min-h-[80%] h-[80%]">1</div>
  //       <div className="bg-green-100 w-full min-h-[20%] h-[20%]">2</div>
  //       {/* <div className="w-[100%] h-[90%] flex flex-col">
  //         <div className="flex-1 bg-[#4B5B88] flex items-center justify-center text-white text-2xl font-bold">
  //           {renderStep()}
  //         </div>
  //         <div className="h-[50px] bg-[#8B4B4B] flex items-center justify-center text-white text-2xl font-bold">
  //           Div 2
  //         </div>
  //       </div> */}
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-screen w-screen flex bg-bg-white">
      {/* Sidebar */}
      <div className="w-[25%] flex justify-center bg-gray-100">
        <div className="w-[80%] mt-[100px] flex">
          <ul className="w-full">
            <li
              onClick={() => changeStep(1)}
              className={`border-0 rounded-[4px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
                step === 1
                  ? "bg-bg-accent text-fg-activated text-[20px]"
                  : "text-fg-deactivated"
              }`}
            >
              Account details
            </li>
            <li
              onClick={() => changeStep(2)}
              className={`border-0 rounded-[4px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
                step === 2
                  ? "bg-bg-accent text-fg-activated text-[20px]"
                  : "text-fg-deactivated"
              }`}
            >
              Allergens
            </li>
            <li
              onClick={() => changeStep(3)}
              className={`border-0 rounded-[4px] transition-all duration-[300ms] text-[18px] py-5 px-[30px] ${
                step === 3
                  ? "bg-bg-accent text-fg-activated text-[20px]"
                  : "text-fg-deactivated"
              }`}
            >
              Location
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center pt-[100px]">
          {renderStep()}
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="w-[70%]">
            {step === 3 ? (
              <button onClick={register} className={styles.button}>
                Register
              </button>
            ) : (
              <button onClick={nextStep} className={styles.button}>
                Next
              </button>
            )}
            {/* {step !== 1 && (
              <button onClick={prevStep} className={styles.buttonBack}>
                Back
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
