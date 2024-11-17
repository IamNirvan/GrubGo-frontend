import axios from "axios";

const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";
const PATCH = "patch";

const request = async (url, type, data, params) => {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT_BACKEND;
  const routePath = baseUrl + url;

  const token = localStorage.getItem("token");
  //   const headers = {
  //     "X-jwt": token,
  //   };
  const instance = axios.create(
    token
      ? {
          headers: {
            "Content-type": "Application/json",
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
          },
        }
      : {
          headers: {
            "Content-type": "Application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
  );
  const options = {
    method: type,
    url: routePath,
    data,
    params,
    headers,
  };

  let result;
  try {
    result = await instance(options);
    return result.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/page/login";
        result = 0;
      } else {
        result = { error };
      }
    }
    return result;
  }
};

export { GET, POST, PUT, PATCH, DELETE, request };
