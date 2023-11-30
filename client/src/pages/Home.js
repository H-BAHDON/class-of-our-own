// Home.js
import React from "react";
import GitHubLoginButton from "../components/GitHubLoginButton";
import { useAuth } from "../hooks/useAuth";
import { Typography, Button, Grid, Container } from "@mui/material";
import homepic from "../homepic.png";

const Home = () => {
  const { login } = useAuth();

  const handleLoginClick = () => {
    login();
  };

  return (
    <Grid container spacing={3}>
      {/* Left side */}
      <Grid item xs={12} md={6} className="left-side">
        <Container>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              marginBottom: "20px",
              marginTop: "6rem",
              fontWeight: "bold",
            }}
          >
            A <span style={{ color: "#d42515" }}>CLASS</span> OF OUR OWN
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "20px",
            }}
          >
            <strong>Pro-Tracker</strong> helps trainees check milestones,
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "40px",
            }}
          >
            plan work and graduate on time. In two clicks.
          </Typography>
          <Button onClick={handleLoginClick} className="centered">
            <GitHubLoginButton />
          </Button>
        </Container>
      </Grid>

      {/* Right side */}
      <Grid item xs={12} md={6}>
        <img
          src={homepic}
          alt="Home Pic"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
