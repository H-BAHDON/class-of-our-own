import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";
import { useAuth } from "../hooks/useAuth";

const CodewarsFactor = () => {
  const [codewarsFactor, setCodewarsFactor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, login, loading } = useAuth();

// const email = user.userInfo.email

const email = "seyyednavidhejazijouybari@gmail.com"
  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get(`/getRankAndFactorExpectation/${email}`)
      .then((data) => {
        console.log(data.data);
        setCodewarsFactor(data.data);
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
