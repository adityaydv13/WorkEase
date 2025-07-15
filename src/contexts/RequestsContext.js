// src/context/RequestsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RequestsContext = createContext();

export const useRequests = () => useContext(RequestsContext);

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");
  const workerId = localStorage.getItem("workerId");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/hire/requests/${workerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(res.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (token && workerId) {
      fetchRequests();
    }
  }, [token, workerId]);

  return (
    <RequestsContext.Provider value={{ requests, fetchRequests }}>
      {children}
    </RequestsContext.Provider>
  );
};
