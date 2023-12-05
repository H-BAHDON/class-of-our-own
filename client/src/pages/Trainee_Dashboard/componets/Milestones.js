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

export default function Milestones() {
  const [milestonesData, setMilestonesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const instant = axios.configAxios();
        const response = await instant.get("/milestones");
        setMilestonesData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching milestones:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
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
            {milestonesData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
}
