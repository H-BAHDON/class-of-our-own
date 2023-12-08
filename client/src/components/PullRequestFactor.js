import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import axios from "../config/configAxios";
import usePullRequestsData from "../hooks/UsePullRequestData";

const PullRequestFactor = ({
  open,
  currentMilestoneEndDAte,
  startPullNumber,
}) => {
  const { isLoading: isLoadingData, pullsData } = usePullRequestsData();
  const [isLoading, setIsLoading] = useState(false);

  const achievedValue = pullsData ? pullsData.pulls : 0;
  const targetValue = pullsData ? pullsData.factorExpectationValue : 0;
  const remainingValue = Math.max(targetValue - achievedValue, 0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const startValue = startPullNumber;
  const progressPercentage = ((achievedValue / targetValue) * 100).toFixed(2);
  const isOver100Percent = progressPercentage > 100;

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
      {isLoading || isLoadingData ? (
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
            Number at the start of the course: {startValue}
          </Typography>
          <Typography variant="body1">
            Achieved Number: {achievedValue}
          </Typography>
          <Typography variant="body1">
            Expected Number: {targetValue} by {currentMilestoneEndDAte}
          </Typography>

          {/* Doughnut chart with modified data */}
          <Doughnut data={doughnutData} />
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            <Typography variant="body1">
              {isOver100Percent
                ? "Progress percentage: > 100%"
                : `Progress percentage: ${progressPercentage}%`}
            </Typography>
          </div>
        </Paper>
      )}
    </>
  );
};

export default PullRequestFactor;
