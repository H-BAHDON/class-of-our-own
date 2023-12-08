import React from "react";
import { Box, Paper, Container } from "@mui/material";
import CurrentMilestone from "../../../components/CurrentMilestone";
import axios from "../../../config/configAxios";
import CodewarsFactor from "../../../components/CodewarsFactor";
import PullRequestFactor from "../../../components/PullRequestFactor";
import { useState, useEffect } from "react";
import Milestones from "./Milestones";
import PullRequests from "./PullRequests";
import formatDate from "../../../Helper/formatDate";

const MainContent = ({ selectedTab, open }) => {
  const [currentMilestoneData, setCurrentMilestoneData] = useState({});
  const [startRank, setStartRank] = useState(null);
  const [milestonesData, setMilestonesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startPullNumber, setStartPullNumber] = useState(null);

  useEffect(() => {
    const instant = axios.configAxios();
    instant
      .get("/current-milestone")
      .then((data) => {
        setCurrentMilestoneData(data.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const instant = axios.configAxios();
        const response = await instant.get("/milestones");
        setMilestonesData(response.data);
        setStartRank(response.data[0].factors[0].value);
        setStartPullNumber(response.data[0].factors[3].value);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching milestones:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box
        className="content"
        sx={{
          padding: "1.5rem",
          backgroundColor: "#faf8f6",
          maxWidth: "100%",
        }}
      >
        <Box>
          {selectedTab === "overview" && (
            <Box>
              <CurrentMilestone
                currentMilestoneName={currentMilestoneData.name}
                currentMilestoneStartDare={formatDate(
                  currentMilestoneData.startDate
                )}
                currentMilestoneEndDAte={formatDate(
                  currentMilestoneData.endDate
                )}
              />
            </Box>
          )}

          {selectedTab === "overview" && (
            <Box>
              <h3 className="dashboard-titles">Current Progress</h3>
              <Box
                className="factors"
                sx={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  "& > div": {
                    flex: "1 1 calc(50% - 0.5rem)",
                    padding: "1.5rem",
                    backgroundColor: "#d5d4d4",
                    marginBottom: "1rem",
                    maxWidth: {
                      xs: open ? "100%" : "25rem",
                      sm: open ? "100%" : "25rem",
                      md: "calc(50% - 0.5rem)",
                      lg: "calc(50% - 0.5rem)",
                    },
                  },
                }}
              >
                {/* First Box with Codewars data */}
                <Paper elevation={2} sx={{ width: "100%" }}>
                  <CodewarsFactor
                    startRank={startRank}
                    open={open}
                    currentMilestoneEndDAte={formatDate(
                      currentMilestoneData.endDate
                    )}
                  />
                </Paper>

                {/* Second Box (blank) */}
                <Paper elevation={2} sx={{ width: "100%" }}>
                  <PullRequestFactor
                    startPullNumber={startPullNumber}
                    open={open}
                    currentMilestoneEndDAte={formatDate(
                      currentMilestoneData.endDate
                    )}
                  />
                </Paper>
              </Box>
            </Box>
          )}

          {selectedTab === "prDetails" && (
            <Box>
              <PullRequests />
            </Box>
          )}
          {selectedTab === "Milestones" && (
            <Box>
              <Milestones
                milestonesData={milestonesData}
                isLoading={isLoading}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;
