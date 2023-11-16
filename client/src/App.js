import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import TraineeDashboard from "./pages/TraineeDashboard";
import Home from "./pages/Home.js";

function App() {
  return (
    <Router>
      <Container>
        <Typography variant="h6">test: its working </Typography>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/trainee/" element={<TraineeDashboard />} />
        </Routes>
     </Container>
    </Router>
  );
}

export default App;
