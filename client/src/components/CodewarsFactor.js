import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";
import { useAuth } from "../hooks/useAuth";

const CodewarsFactor = () => {
  const [codewarsFactor, setCodewarsFactor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, login, loading } = useAuth();

  // const email = user.userInfo.email
  const email = "seyyednavidhejazijouybari@gmail.com";

  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get(`/getRankAndFactorExpectation/${email}`)
      .then((data) => {
        setCodewarsFactor(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Rank: {codewarsFactor.rank}</p>
          <p>Factor Name: {codewarsFactor.factorName}</p>
          <p>
            Factor Expectation Value: {codewarsFactor.factorExpectationValue}
          </p>
        </div>
      )}
    </>
  );
};

export default CodewarsFactor;
