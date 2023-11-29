import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";
import { useAuth } from "../hooks/useAuth";

const CodewarsFactor = () => {
  const [codewarsFactor, setCodewarsFactor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, login, loading } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get(`/getRankAndFactorExpectation/:{user.userInfo.email}`)
      .then((data) => {
        console.log(data);
        setCodewarsFactor(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return <>{codewarsFactor}</>;
};

export default CodewarsFactor;
