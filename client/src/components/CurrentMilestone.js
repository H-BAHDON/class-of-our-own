import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";
import { Paper, Typography, CircularProgress } from "@mui/material";

const CurrentMilestone = () => {
  const [currentMilestoneData, setCurrentMilestoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get("/current-milestone")
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setCurrentMilestoneData(data);
        console.log(currentMilestoneData);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
          <Typography variant="h6">
            Current Milestone: {currentMilestoneData.data.name}
          </Typography>
          <Typography variant="body1">
            Milestone Start Date:{" "}
            {formatDate(currentMilestoneData.data.startDate)}
          </Typography>
          <Typography variant="body1">
            Milestone End Date: {formatDate(currentMilestoneData.data.endDate)}
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default CurrentMilestone;
