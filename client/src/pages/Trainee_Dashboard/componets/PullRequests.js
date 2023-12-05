import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(no, name) {
  return { no, name };
}

const rows = [
  createData(1, "Pull Request 1"),
  createData(2, "Pull Request 2"),
  createData(3, "Pull Request 3"),
  createData(4, "Pull Request 4"),
  createData(5, "Pull Request 5"),
];

export default function PullRequests() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#d5d4d4" }}>
            <TableCell>No</TableCell>
            <TableCell>Name of the pull request</TableCell>
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
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
