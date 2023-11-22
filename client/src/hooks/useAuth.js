import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../config/configAxios";

const { configAxios, apiUrl } = axiosConfig;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = configAxios();

  useEffect(() => {
    axiosInstance
      .get("/user")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [axiosInstance]);

  const login = () => {
    window.location.href = `${apiUrl}/auth/github`;
  };

  const logout = () => {
    axiosInstance
      .get("/logout")
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
