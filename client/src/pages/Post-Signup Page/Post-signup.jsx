import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";

export default function PostSignup() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [codeWarsUsername, setCodeWarsUsername] = useState("");
  const [codilityUsername, setCodilityUsername] = useState("");

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmitForTrainee = async (event) => {
    event.preventDefault();
    // if (!codeWarsUsername || !codilityUsername) {
    //   console.error("CodeWars username and Codility username are required.");
    //   return;
    // }
    try {
      const response = await fetch("http://localhost:3001/signpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeWarsUsername,
          codilityUsername,
        }),
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Tabs value={activeTab} onChange={handleChangeTab} centered>
          <Tab label="Trainee" />
          <Tab label="Volunteer" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <form action="/" method="post" onSubmit={handleSubmitForTrainee}>
              <Typography variant="h5" align="center" mb={2}>
                Welcome to CYF Rookie, we need some data
              </Typography>

              <TextField
                label="CodeWars UserName"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={(e) => setCodeWarsUsername(e.target.value)}
              />

              <TextField
                label="Codility"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={(e) => setCodilityUsername(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Get Started
              </Button>
            </form>
          )}

          {activeTab === 1 && (
            <Box sx={{ position: "relative" }}>
              <form action="/" method="post">
                <Typography variant="h5" align="center" mb={2}>
                  Welcome Volunteer!
                </Typography>

                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                />

                <TextField
                  label=""
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Log In
                </Button>
              </form>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Feature Coming Soon
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
