import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { useToast } from "@chakra-ui/react";

const useAxios = (user, setUser) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // Request interceptor to handle token validation and session expiration
  axiosInstance.interceptors.request.use(
    (config) => {
      if (user?.token) {
        const decodedToken = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;

        if (decodedToken?.exp < currentTime) {
          setUser(null);
          localStorage.removeItem("userInfo");
          toast({
            title: "Session Expired",
            description: "Please log in again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          navigate("/login");
          return Promise.reject("Session expired"); // Stop the request if token is expired
        } else {
          config.headers["Authorization"] = `Bearer ${user.token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Optional: Response interceptor (if needed)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  // Handle component unmounting with AbortController
  let controller = new AbortController();
  useEffect(() => {
    return () => {
      controller.abort(); // Abort any ongoing request when component unmounts
    };
  }, []);

  const fetchData = async ({
    url,
    method,
    data = {},
    params = {},
    headers = {},
  }) => {
    setLoading(true);
    controller.abort(); // Cancel any previous request
    controller = new AbortController(); // Reset controller for new request

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
        signal: controller.signal,
      });
      setResponse(result);
      //  setResponse((prevResponse) => ({
      //    ...prevResponse,
      //    [identifier]: result, // Save response with identifier
      //  }));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request is cancelled", error.message);
      } else {
        setError(error.response ? error.response.data.error : error.message);
        //  setError((prevError) => ({
        //  ...prevError,
        //  [identifier]: error.response
        //  /? error.response.data.error
        //  : error.message,
        //  }));
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
