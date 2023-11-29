import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";

const CodewarsFactor = () => {
    const [codewarsFactor, setCodewarsFactor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const instant = axios.configAxios();
        console.log(instant());
        instant
          .get("/getRankAndFactorExpectation/:{}")
          .then((data) => {
            console.log(data);
            setCodewarsFactor(data);
            console.log(codewarsFactor);
            setIsLoading(false);
          })
          .catch((error) => {
              console.log(error);
              setIsLoading(false);
          });
      }, []);
  return (
    <>{codewarsFactor}</>
  ) ;
};

export default CodewarsFactor;
