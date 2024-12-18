import React, { useState, useEffect } from "react";
import styles from "./formStyles.module.css";

const LocationDetails = ({ payload, setPayload }) => {
  const [formVals, setFormVals] = useState({
    buildingNumber: payload.addresses[0].buildingNumber,
    city: payload.addresses[0].city,
    province: payload.addresses[0].province,
    street: payload.addresses[0].street,
    isMain: true,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormVals((prevVals) => ({
      ...prevVals,
      [id]: value,
    }));
  };

  useEffect(() => {
    setPayload((prevVals) => ({
      ...prevVals,
      addresses: [formVals],
    }));
  }, [formVals]);

  return (
    <div className="w-[70%] h-[100%]">
      <div className="mb-4">
        <label htmlFor="buildingNumber" className="block text-gray-700">
          Building number
        </label>
        <input
          type="text"
          id="buildingNumber"
          className={styles.input}
          value={formVals.buildingNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          className={styles.input}
          value={formVals.city}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="province" className="block text-gray-700">
          Province
        </label>
        <input
          type="text"
          id="province"
          className={styles.input}
          value={formVals.province}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="street" className="block text-gray-700">
          Street
        </label>
        <input
          type="text"
          id="street"
          className={styles.input}
          value={formVals.street}
          onChange={handleInputChange}
        />
      </div>
      {/* <button onClick={prevStep} className={`${styles.button} mr-2`}>
        Back
      </button> */}
      {/* <button className={styles.button}>Register</button> */}
    </div>
  );
};

export default LocationDetails;
