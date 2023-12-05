// Home.js
import React from "react";
import GitHubLoginButton from "../components/GitHubLoginButton";
import { useAuth } from "../hooks/useAuth";
import { Typography, Button, Grid, Container } from "@mui/material";
import homepic1 from "../homepic1.png";

const Home = () => {
  const { login } = useAuth();

  const handleLoginClick = () => {
    login();
  };

  return (
    <Grid
      container
      spacing={3}
      style={{ height: "100vh", alignItems: "center" }}
    >
      {/* Left side */}
      <Grid item xs={12} md={6} className="left-side">
        <Container>
          <Typography
            variant="h2"
            gutterBottom
            style={{
              marginBottom: "25px",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#d42515" }}>TRACK</span> YOUR PROGRESS
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "0px",
              fontWeight: "500",
              fontSize: "1.3rem",
            }}
          >
            <strong>Pro-Tracker</strong> helps trainees check milestones,
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "25px",
              fontWeight: "500",
              fontSize: "1.3rem",
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
      <Grid
        item
        xs={12}
        md={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={homepic1}
          alt="Home Pic"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
