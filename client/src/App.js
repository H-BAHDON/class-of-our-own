import React from 'react';
import Home from "./pages/Home.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { Container, Typography } from '@mui/material';


function App() {
  return (
    <Router>
      {/* <Container> */}
        {/* <Typography variant="h6">test: its working </Typography> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      {/* </Container> */}
    </Router>
  );
}

export default App;
