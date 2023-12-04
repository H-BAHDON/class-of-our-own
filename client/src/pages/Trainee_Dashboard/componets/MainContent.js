import React from "react";
import { Box, Typography, Container, SvgIcon } from "@mui/material";
import CurrentMilestone from "../../../components/CurrentMilestone";
import CodewarsFactor from "../../../components/CodewarsFactor";
import PullRequestFactor from "../../../components/PullRequestFactor";
import Milestones from "./Milestones";
import PullRequests from "./PullRequests";

const MainContent = ({ selectedTab, open }) => {
  console.log("Selected Tab in MainContent:", selectedTab);

  return (
    <Container>
      <Box
        className="content"
        sx={{
          padding: "1.5rem",
          backgroundColor: "#fffdfd",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box>
          {selectedTab === "overview" && (
            <Box>
              <CurrentMilestone />
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
                  <CodewarsFactor open={open} />
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
                  <PullRequestFactor open={open} />
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
              <Milestones />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;
