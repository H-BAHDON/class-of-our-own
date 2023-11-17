import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import { Container, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import TraineeDashboard from "./pages/TraineeDashboard";
import Home from "./pages/Home.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainee/" element={<TraineeDashboard />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
