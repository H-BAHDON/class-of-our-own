import React from "react";
import { Box, Typography, Container, SvgIcon } from "@mui/material";
import CurrentMilestone from "../../../components/CurrentMilestone";
import CodewarsFactor from "../../../components/CodewarsFactor";

const MainContent = ({ selectedTab }) => {
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
          <h3 className="dashboard-titles">Current Progress</h3>
          {selectedTab === "overview" && (
            <Box
              className="factors"
              sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              {/* First Box with Codewars data */}
              <Box
                sx={{
                  flex: "1 1 calc(50% - 0.5rem)",
                  padding: "1.5rem",
                  backgroundColor: "#f8f2ed",
                  marginBottom: "1rem",
                }}
              >
                <CodewarsFactor />
              </Box>

              {/* Second Box (blank) */}
              <Box
                sx={{
                  flex: "1 1 calc(50% - 0.5rem)",
                  padding: "1.5rem",
                  backgroundColor: "#f8f2ed",
                  marginBottom: "1rem",
                }}
              ></Box>

              {/* Third Box (blank) */}
              <Box
                sx={{
                  flex: "1 1 calc(50% - 0.5rem)",
                  padding: "1.5rem",
                  backgroundColor: "#f8f2ed",
                  marginBottom: "1rem",
                }}
              ></Box>

              {/* Fourth Box (blank) */}
              <Box
                sx={{
                  flex: "1 1 calc(50% - 0.5rem)",
                  padding: "1.5rem",
                  backgroundColor: "#f8f2ed",
                  marginBottom: "1rem",
                }}
              ></Box>
            </Box>
          )}

          {selectedTab === "prDetails" && (
            <Box>
              <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
                PR Details Section
              </Typography>
              <Typography variant="body1">
                Content specific to PR Details goes here.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;
