import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import MainPage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Container>
        {/* <Typography variant="h6">test: its working </Typography> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Your routes go here */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
