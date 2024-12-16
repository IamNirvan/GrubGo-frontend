import React, { useState } from "react";
import styles from "./formStyles.module.css";
import "@fontsource/poppins";

const AccountDetails = ({ payload, setPayload }) => {
  const [formVals, setFormVals] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormVals((prevVals) => ({
      ...prevVals,
      [id]: value,
    }));

    // Update the register payload
    setPayload((preVals) => ({
      ...preVals,
      [id]: value,
    }));
  };

  return (
    <div className="w-[70%] h-[100%]">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className={styles.input}
          value={payload.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className={styles.input}
          value={payload.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={payload.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className={styles.input}
          value={payload.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={payload.password}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
