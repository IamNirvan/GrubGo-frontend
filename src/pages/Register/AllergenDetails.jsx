import React, { useState } from "react";
import Select from "react-select";

const allergenOptions = [
  { value: "peanuts", label: "Peanuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "eggs", label: "Eggs" },
  { value: "milk", label: "Milk" },
  { value: "soy", label: "Soy" },
  { value: "wheat", label: "Wheat" },
  // Add more allergens as needed
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#D1D5DB", // Tailwind's gray-300
    borderRadius: "0.375rem", // Tailwind's rounded-md
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9CA3AF", // Tailwind's gray-400
    },
  }),
};

const AllergenDetails = ({ nextStep, prevStep }) => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedAllergens(selectedOptions);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="allergens" className="block text-gray-700">
          Allergens (optional)
        </label>
        <Select
          id="allergens"
          isMulti
          options={allergenOptions}
          value={selectedAllergens}
          onChange={handleChange}
          styles={customStyles}
          className="mt-1 block w-full"
          placeholder="Select allergens..."
        />
      </div>
      <button
        onClick={prevStep}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default AllergenDetails;
