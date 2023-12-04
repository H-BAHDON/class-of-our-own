import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js/auto";

const PullRequestFactor = ({ open }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const achievedValue = 20;
  const targetValue = 27;
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
          <Typography variant="h6">Pull Requests</Typography>
          <Typography variant="body1">
            Current Number: {achievedValue}
          </Typography>
          <Typography variant="body1">
            Expected Number: {targetValue}
          </Typography>

          {/* Doughnut chart with modified data */}
          <Doughnut data={doughnutData} />
        </Paper>
      )}
    </>
  );
};

export default PullRequestFactor;
