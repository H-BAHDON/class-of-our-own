import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetchPullRequests from '../../../hooks/UseFetchPullRequests'; 
import UseGetWithOutPullRequests from '../../../hooks/UseGetWithOutPullRequest';
import formatDate from "../../../Helper/formatDate";
import { Typography, Button } from "@mui/material";

const PullRequests = () => {
  const [showPullRequests, setShowPullRequests] = useState(true);
  const { pullRequestsData, loading: pullRequestsLoading, error: pullRequestsError } = useFetchPullRequests();
  const { reposWithoutPullRequests, loading: withoutPullRequestsLoading, error: withoutPullRequestsError } = UseGetWithOutPullRequests();
  const [visibleRows, setVisibleRows] = useState(10);

  const dataToShow = showPullRequests ? pullRequestsData?.withPR : reposWithoutPullRequests;

  const loading = showPullRequests ? pullRequestsLoading : withoutPullRequestsLoading;
  const error = showPullRequests ? pullRequestsError : withoutPullRequestsError;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = (dataToShow || []).sort((a, b) => new Date(b.items[0]?.createdAt) - new Date(a.items[0]?.createdAt));

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 10);
  };

  const handleToggle = () => {
    setShowPullRequests(!showPullRequests);
    setVisibleRows(10);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center", color: "#D82929", fontWeight: "bold" }}>
        {showPullRequests ? "Pull Requests" : "Repositories Without Pull Requests"}
      </Typography>
      <Typography variant="body1" paragraph style={{ textAlign: "center" }}>
        {showPullRequests
          ? "Quick links to your CYF PRs. Review, edit, and check for CYF comments"
          : "Repositories without pull requests. Go to GitHub and make a Pull Request."}
      </Typography>
      <Button variant="outlined" onClick={handleToggle} style={{ margin: '10px auto', display: 'block' }}>
        {showPullRequests ? "Show Repos Without PR" : "Show Pull Requests"}
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
  <TableRow sx={{ backgroundColor: "#d5d4d4" }}>
    <TableCell>No</TableCell>
    <TableCell>{showPullRequests ? "Pull Request" : "Repository"}</TableCell>
    <TableCell>Created On</TableCell>
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
        {showPullRequests ? (
          <a href={row.items[0]?.htmlUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            {row.items[0]?.title}
          </a>
        ) : (
          row.repoName 
        )}
      </TableCell>
      <TableCell>{showPullRequests ? (formatDate(row.items[0]?.createdAt)) : ("Haven't created PR Yet") }</TableCell>
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
