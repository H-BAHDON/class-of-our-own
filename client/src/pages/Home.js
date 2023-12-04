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
    <Grid
      container
      spacing={3}
      style={{ height: "100vh", alignItems: "center" }}
    >
      {/* Left side */}
      <Grid item xs={12} md={6} className="left-side">
        <Container>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              marginBottom: "20px",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            <span style={{ color: "#d42515", fontFamily: "Montserrat" }}>
              TRACK
            </span>{" "}
            YOUR PROGRESS
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "10px",
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            <strong>Pro-Tracker</strong> helps trainees check milestones,
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            style={{
              marginBottom: "20px",
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontSize: "1.1rem",
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
          src={homepic}
          alt="Home Pic"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
