import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import axios from "../config/configAxios";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CodewarsFactor = () => {
  const [codewarsFactor, setCodewarsFactor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();

  const userInfo = user?.userInfo;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Use user.traineeCodwarsUsername in the API request
        const response = await axios
          .configAxios()
          .get(`/codewars/${userInfo.traineeCodwarsUsername}`);
        setCodewarsFactor(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [user, loading]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Paper style={{ textAlign: "left", padding: "16px" }}>
          <Typography variant="h6">{codewarsFactor?.factorName}</Typography>
          <Typography variant="body1">
            Current Rank: {codewarsFactor?.rank}
          </Typography>

          <Typography variant="body1">
            Expected Rank: {codewarsFactor?.factorExpectationValue}
            <FontAwesomeIcon
              icon="fa-solid fa-code-pull-request"
              style={{ color: "#1c1e21" }}
            />
          </Typography>

          <LinearProgress
            variant="determinate"
            value={codewarsFactor?.factorExpectationValue}
            sx={{ marginTop: 2 }}
          />
        </Paper>
      )}
    </>
  );
};

export default CodewarsFactor;
