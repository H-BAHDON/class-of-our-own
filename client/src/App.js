import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import TraineeDashboard from "./pages/TraineeDashboard";
import Home from "./pages/Home.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainee/" element={<TraineeDashboard />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
