import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetchPullRequests from '../../../hooks/UseFetchPullRequests'; 
import formatDate from "../../../Helper/formatDate"
import { Typography, Button } from "@mui/material";

const PullRequests = () => {
  const { pullRequestsData, loading, error } = useFetchPullRequests();
  const [visibleRows, setVisibleRows] = useState(5);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = (pullRequestsData?.withPR || []).sort((a, b) => new Date(a.items[0]?.createdAt) - new Date(b.items[0]?.createdAt));

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 5);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center", color: "#D82929", fontWeight: "bold" }}>
        Pull Requests
      </Typography>
      <Typography variant="body1" paragraph style={{ textAlign: "center" }}>
        Check all your Pull Requests & dates in CodeYourFuture.
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#d5d4d4" }}>
              <TableCell>No</TableCell>
              <TableCell>Pull Request Name</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fafafa" }}>
            {rows.slice(0, visibleRows).map((row, index) => (
              <TableRow
                key={index + 1}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <a href={row.items[0]?.htmlUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                    {row.items[0]?.title}
                  </a>
                </TableCell>
                <TableCell>{formatDate(row.items[0]?.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleRows < rows.length && (
        <Button variant="outlined" onClick={handleShowMore} style={{ margin: '10px auto', display: 'block' }}>
          Show More
        </Button>
      )}
    </>
  );
  
};

export default PullRequests;
