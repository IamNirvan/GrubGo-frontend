import React from "react";
import styles from "./formStyles.module.css";

const LocationDetails = ({ prevStep }) => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700">
          Address
        </label>
        <input type="text" id="address" className={styles.input} />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700">
          City
        </label>
        <input type="text" id="city" className={styles.input} />
      </div>
      <div className="mb-4">
        <label htmlFor="zipCode" className="block text-gray-700">
          Zip Code
        </label>
        <input type="text" id="zipCode" className={styles.input} />
      </div>
      <button onClick={prevStep} className={`${styles.button} mr-2`}>
        Back
      </button>
      <button className={styles.button}>Register</button>
    </div>
  );
};

export default LocationDetails;
