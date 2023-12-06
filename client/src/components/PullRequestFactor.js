// import React, { useState, useEffect } from "react";
// import { CircularProgress, Typography, Paper } from "@mui/material";
// import { Doughnut } from "react-chartjs-2";
// import { Chart, ArcElement, Legend, Tooltip } from "chart.js/auto";
// import axios from "../config/configAxios";

// const PullRequestFactor = ({ open }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentMilestoneData, setCurrentMilestoneData] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       setIsLoading(false);
//     };

//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "numeric", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };


//   useEffect(() => {
//     setIsLoading(true);
//     const instant = axios.configAxios();
//     instant
//       .get("/current-milestone")
//       .then((data) => {
//         setIsLoading(false);
//         console.log(data);
//         setCurrentMilestoneData(data);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }, []);

//   const achievedValue = 20;
//   const targetValue = 27;
//   const remainingValue = Math.max(targetValue - achievedValue, 0);

//   const doughnutData = {
//     labels: ["Achieved", "Remaining"],
//     datasets: [
//       {
//         data: [achievedValue, remainingValue],
//         backgroundColor: ["#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   return (
//     <>
//       {isLoading ? (
//         <CircularProgress />
//       ) : (
//         <Paper
//           style={{
//             textAlign: "left",
//             padding: "16px",
//             maxWidth: open ? "25rem" : "25rem",
//             margin: "auto",
//           }}
//         >
//           <Typography variant="h6">Pull Requests</Typography>
//           <Typography variant="body1">
//             Achieved Number: {achievedValue}
//           </Typography>
//           <Typography variant="body1">
//             Expected Number: {targetValue} by {formatDate(currentMilestoneData.data.endDate)}
//           </Typography>

//           {/* Doughnut chart with modified data */}
//           <Doughnut data={doughnutData} />
//         </Paper>
//       )}
//     </>
//   );
// };

// export default PullRequestFactor;
