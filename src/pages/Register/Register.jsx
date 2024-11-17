import React, { useState } from "react";
import AccountDetails from "./AccountDetails";
import AllergenDetails from "./AllergenDetails";
import LocationDetails from "./LocationDetails";

const Register = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountDetails nextStep={nextStep} />;
      case 2:
        return <AllergenDetails nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <LocationDetails prevStep={prevStep} />;
      default:
        return <AccountDetails nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>
        <div className="flex">
          <div className="w-1/4">
            <ul>
              <li
                className={`py-2 px-4 ${
                  step === 1 ? "bg-red-500 text-white" : ""
                }`}
              >
                Account details
              </li>
              <li
                className={`py-2 px-4 ${
                  step === 2 ? "bg-red-500 text-white" : ""
                }`}
              >
                Allergens
              </li>
              <li
                className={`py-2 px-4 ${
                  step === 3 ? "bg-red-500 text-white" : ""
                }`}
              >
                Location
              </li>
            </ul>
          </div>
          <div className="w-3/4 pl-4">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
