import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/authSlice";

const useAxios = (url) => {
  // Create the state to manage loading, responses, errors, etc.
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = useSelector(selectCurrentToken);

  // Create the axios instance with default options
  const axiosIntance = axios.create({
    baseURL: url ?? import.meta.env.VITE_API_ENDPOINT_BACKEND,
  });

  // Interceot response to handle errors and add token to each request
  axiosIntance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Create a cancel token when this component mounts
  // Use this to cancel the request when the component unmounts
  useEffect(() => {
    const source = axios.CancelToken.source();
    return () => {
      source.cancel("Component unmounted. Request cancelled.");
    };
  }, []);

  // Create function that can be used to send request and manage state
  const sendRequest = async ({ url, method, data = {}, headers = {} }) => {
    setLoading(true);

    // Construct the request headers
    const _headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      ...headers,
    };

    // Add the tken if its present
    if (token) {
      _headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in local storage");
    }

    // Send request and handle response
    try {
      const response = await axiosIntance({
        url,
        method,
        data,
        headers: _headers,
        cancelToken: axios.CancelToken.source().token,
      });
      setResponse(response);
      return response;
    } catch (error) {
      if (error.code === 403) {
        console.error("User is logged out. Redirecting to login page...");
      }

      if (axios.isCancel(error)) {
        console.error("Request cancelled: ", error.message);
        // throw new Error("Request cancelled");
        throw error;
      } else {
        const errorMessage = error.response
          ? error.response.data
          : error.message;
        setErrorMessage(errorMessage);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, errorMessage, loading, sendRequest };
};

export default useAxios;
