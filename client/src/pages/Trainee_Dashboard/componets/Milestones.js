import React, { useState, useEffect } from "react";
import axios from "../../../config/configAxios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

export default function Milestones({ milestonesData }) {
  const [currentMilestoneData, setCurrentMilestoneData] = useState({});
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

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", color: "#D82929", fontWeight: "bold" }}
      >
        Milestone Table
      </Typography>
      <Typography variant="body1" paragraph style={{ textAlign: "center" }}>
        Check your milestones and performance expectations with dates.
      </Typography>
      <TableContainer component={Paper}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#d5d4d4" }}>
                <TableCell>No</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Codewars</TableCell>
                <TableCell>Codility</TableCell>
                <TableCell>Pull Reqs</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "#fafafa" }}>
              {milestonesData !== null &&
                milestonesData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor:
                          index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                      },
                      ...(currentMilestoneData &&
                        currentMilestoneData.data.name === row.milestone && {
                          backgroundColor: "#ffcccc",
                        }),
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.milestone}</TableCell>
                    <TableCell>
                      {new Date(row.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {row.factors.find((factor) => factor.name === "Codewars")
                        ?.value || 0}
                    </TableCell>
                    <TableCell>
                      {row.factors.find((factor) => factor.name === "Codility")
                        ?.value || 0}
                    </TableCell>
                    <TableCell>
                      {row.factors.find((factor) => factor.name === "Pulls")
                        ?.value || 0}
                    </TableCell>
                    <TableCell>{`${
                      row.factors.find((factor) => factor.name === "Attendance")
                        ?.value || 0
                    }%`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}
