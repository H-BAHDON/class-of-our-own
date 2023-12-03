import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import axios from "../config/configAxios";
import { useAuth } from "../hooks/useAuth";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js/auto";

const CodewarsFactor = () => {
  const [codewarsFactor, setCodewarsFactor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();

  const userInfo = user?.userInfo;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
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

  // Convert factorExpectationValue to a number
  const factorValue = parseFloat(codewarsFactor?.factorExpectationValue) || 0;

  const doughnutData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [factorValue, 100 - factorValue],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

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
          </Typography>

          <Doughnut data={doughnutData} />

          {/* Ensure the value prop is a number */}
          <LinearProgress
            variant="determinate"
            value={factorValue}
            sx={{ marginTop: 2 }}
          />
        </Paper>
      )}
    </>
  );
};

export default CodewarsFactor;
