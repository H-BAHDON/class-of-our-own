import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  no,
  milestones,
  startDate,
  codewars,
  codility,
  pullReqs,
  attendance
) {
  return {
    no,
    milestones,
    startDate,
    codewars,
    codility,
    pullReqs,
    attendance,
  };
}

const rows = [
  createData(1, "HTML", "2023-01-01", 7, 8, 2, "100%"),
  createData(2, "JAVASCRIPT 1", "2023-02-15", 5, 6, 3, "100%"),
  // Add more rows as needed
];

export default function Milestones() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
            <TableCell>No</TableCell>
            <TableCell>Milestones</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Codewars</TableCell>
            <TableCell>Codility</TableCell>
            <TableCell>Pull Reqs</TableCell>
            <TableCell>Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#fafafa" }}>
          {rows.map((row) => (
            <TableRow
              key={row.no}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell>{row.milestones}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.codewars}</TableCell>
              <TableCell>{row.codility}</TableCell>
              <TableCell>{row.pullReqs}</TableCell>
              <TableCell>{row.attendance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
