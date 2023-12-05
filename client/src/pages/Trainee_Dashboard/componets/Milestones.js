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

  return <div></div>;
}
