import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./formStyles.module.css";

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

const AllergenDetails = ({ payload, setPayload }) => {
  const [selectedAllergens, setSelectedAllergens] = useState(
    payload.allergens ?? []
  );

  const handleChange = (selectedOptions) => {
    setSelectedAllergens(selectedOptions);
  };

  // Update the payload whenever selectedAllergens changes
  useEffect(() => {
    setPayload((prevVals) => ({
      ...prevVals,
      allergens: selectedAllergens.map((allergen) => ({
        value: allergen.value,
        label: allergen.label,
      })),
    }));
  }, [selectedAllergens]);

  return (
    <div className="w-[70%] h-[100%]">
      <div className="mb-4">
        <label htmlFor="allergens" className="block text-gray-700">
          Allergens (optional)
        </label>
        <Select
          id="allergens"
          isMulti
          options={allergenOptions}
          value={payload.allergens}
          onChange={handleChange}
          styles={customStyles}
          className={styles.select}
          placeholder="Select allergens"
        />
      </div>
    </div>
  );
};

export default AllergenDetails;
