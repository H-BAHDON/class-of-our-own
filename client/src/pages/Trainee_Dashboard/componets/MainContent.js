import React from "react";
import { Box, Typography, Container, SvgIcon, Button } from "@mui/material";
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
                sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              >
                {/* First Box with Codewars data */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 0.5rem)",
                    padding: "1.5rem",
                    backgroundColor: "#d5d4d4",
                    marginBottom: "1rem",
                    maxWidth: open ? "25rem" : "25",
                  }}
                >
                  <CodewarsFactor
                    startRank={startRank}
                    open={open}
                    currentMilestoneEndDAte={formatDate(
                      currentMilestoneData.endDate
                    )}
                  />
                </Box>

                {/* Second Box (blank) */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 0.5rem)",
                    padding: "1.5rem",
                    backgroundColor: "#d5d4d4",
                    marginBottom: "1rem",
                    maxWidth: open ? "25rem" : "25",
                  }}
                >
                  <PullRequestFactor
                    open={open}
                    currentMilestoneEndDAte={formatDate(
                      currentMilestoneData.endDate
                    )}
                  />
                </Box>

                {/* Third Box (blank) */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 0.5rem)",
                    padding: "1.5rem",
                    backgroundColor: "#d5d4d4",
                    marginBottom: "1rem",
                  }}
                ></Box>
                {/* Fourth Box (blank) */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 0.5rem)",
                    padding: "1.5rem",
                    backgroundColor: "#d5d4d4",
                    marginBottom: "1rem",
                  }}
                ></Box>
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
