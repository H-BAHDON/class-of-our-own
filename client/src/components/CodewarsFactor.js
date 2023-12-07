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

const CodewarsFactor = ({ open, currentMilestoneEndDAte, startRank }) => {
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

  const parsedRank = parseFloat(codewarsFactor?.rank) || 0;

  const parsedTarget =
    parseInt(codewarsFactor?.factorExpectationValue, 10) || 0;

  const startValue = startRank;
  const achievedValue = parsedRank;
  const targetValue = parsedTarget;
  const remainingValue = Math.max(achievedValue - targetValue, 0);
  const progressValue = Math.max(startValue - achievedValue, 0);
  const progressPercentage =
    ((startValue - achievedValue) / (startValue - targetValue)) * 100;
  console.log("Progress Value:", progressValue);
  console.log("Remaining Value:", remainingValue);

  const doughnutData = {
    labels: ["Progress", "Remaining"],
    datasets: [
      {
        data: [progressValue, remainingValue],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };
  console.log(doughnutData);

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
            Rank at the start of the course: {startValue} kyu
          </Typography>
          <Typography variant="body1">
            Achieved Rank: {codewarsFactor?.rank}
          </Typography>
          <Typography variant="body1">
            Expected Rank: {codewarsFactor?.factorExpectationValue} by{" "}
            {currentMilestoneEndDAte}
          </Typography>

          {/* Doughnut chart with modified data */}
          <Doughnut data={doughnutData} />

          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            <Typography variant="body1">
              Progress percentage: {progressPercentage}%
            </Typography>
          </div>

          {/* LinearProgress representing the achieved progress */}
        </Paper>
      )}
    </>
  );
};
export default CodewarsFactor;
