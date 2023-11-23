import React, { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../config/configAxios";

const { configAxios, apiUrl } = axiosConfig;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = configAxios();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchUserData();
    }
  }, [axiosInstance, setUser, setLoading, loading]);

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
