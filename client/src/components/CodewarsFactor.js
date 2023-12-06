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

const CodewarsFactor = ({ open, currentMilestoneEndDAte }) => {
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



  Chart.register(ArcElement, Legend, Tooltip);

  const achievedValue = parseFloat(codewarsFactor?.rank) || 0;
  const targetValue = parseFloat(codewarsFactor?.factorExpectationValue) || 0;
  const remainingValue = Math.max(targetValue - achievedValue, 0);

  const doughnutData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [achievedValue, remainingValue],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Paper
          style={{
            textAlign: "left",
            padding: "16px",
            maxWidth: open ? "25rem" : "25rem",
            margin: "auto",
          }}
        >
          <Typography variant="h6">{codewarsFactor?.factorName}</Typography>
          <Typography variant="body1">
            Achieved Rank: {codewarsFactor?.rank}
          </Typography>
          <Typography variant="body1">
            Expected Rank: {codewarsFactor?.factorExpectationValue} by {currentMilestoneEndDAte}
          </Typography>

          {/* Doughnut chart with modified data */}
          <Doughnut data={doughnutData} />

          {/* LinearProgress representing the achieved progress */}
        </Paper>
      )}
    </>
  );
};

export default CodewarsFactor;
