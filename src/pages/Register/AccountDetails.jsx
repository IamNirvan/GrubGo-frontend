import React from "react";
import styles from "./formStyles.module.css";

const AccountDetails = ({ nextStep }) => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">
          First Name
        </label>
        <input type="text" id="firstName" className={styles.input} />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">
          Last Name
        </label>
        <input type="text" id="lastName" className={styles.input} />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input type="email" id="email" className={styles.input} />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input type="password" id="password" className={styles.input} />
      </div>
      <button onClick={nextStep} className={styles.button}>
        Next
      </button>
    </div>
  );
};

export default AccountDetails;
