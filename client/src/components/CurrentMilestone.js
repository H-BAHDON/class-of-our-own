import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import "../index.css";
import CodewarsFactor from "./CodewarsFactor";

const CurrentMilestone = ({
  currentMilestoneName,
  currentMilestoneStartDare,
  currentMilestoneEndDAte,
}) => {
  return (
    <div>
      <h3 className="dashboard-titles">Current Milestone</h3>
      <div className="table-container">
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
              <td>{currentMilestoneName}</td>
              <td>{currentMilestoneStartDare}</td>
              <td>{currentMilestoneEndDAte}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentMilestone;
