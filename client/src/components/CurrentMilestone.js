import React, { useState, useEffect } from "react";
import axios from "../config/configAxios";
import { Paper, Typography, CircularProgress } from "@mui/material";
import "../index.css";

const CurrentMilestone = () => {
  const [currentMilestoneData, setCurrentMilestoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get("/current-milestone")
      .then((data) => {
        setIsLoading(false);
        setCurrentMilestoneData(data);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="table-container">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentMilestoneData.data.name}</td>
              <td>{formatDate(currentMilestoneData.data.startDate)}</td>
              <td>{formatDate(currentMilestoneData.data.endDate)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrentMilestone;
