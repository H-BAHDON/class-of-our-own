import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import NavBar from "../../components/NavBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "../../config/configAxios";
import { useAuth } from "../../hooks/useAuth";

export default function PostSignup() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [codeWarsUsername, setCodeWarsUsername] = useState("");
  const [codilityUsername, setCodilityUsername] = useState("");
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("");
  const { user } = useAuth();

  const userInfo = user?.userInfo;

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await axios
          .configAxios()
          .get("http://localhost:3001/cohorts");
        setCohorts(response.data.getCohorts);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };

    fetchCohorts();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleCohorts = (event) => {
    const selectedCohortObject = cohorts.find(
      (cohort) => cohort.name === event.target.value
    );
    setSelectedCohort(selectedCohortObject);
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
          cohortId: selectedCohort.id,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            centered
            textColor="black"
            TabIndicatorProps={{ style: { background: "red", color: "red" } }}
          >
            <Tab label="Trainee" />
            <Tab label="Volunteer" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <form action="/" method="post" onSubmit={handleSubmitForTrainee}>
                <Typography variant="h5" align="center" mb={2}>
                  Welcome to CYF Rookie, we need some data
                </Typography>

                <FormControl sx={{ m: "auto", mt: 2, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Cohorts
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedCohort.name}
                    label="Age"
                    onChange={handleCohorts}
                  >
                    <MenuItem value="" disabled>
                      Select a Cohort
                    </MenuItem>
                    {cohorts.map((cohort) => (
                      <MenuItem key={cohort.id} value={cohort.name}>
                        {cohort.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Codewars UserName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={(e) => setCodeWarsUsername(e.target.value)}
                />

                <TextField
                  label="Codility (optional)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={(e) => setCodilityUsername(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#ED4343", color: "white" }}
                  sx={{ mt: 2 }}
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
    </>
  );
}
