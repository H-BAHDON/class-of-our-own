import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import TraineeDashboard from "./pages/Trainee_Dashboard/TraineeDashboard.js";
import Home from "./pages/Home.js";
import Footer from "./components/Footer.js";
import { AuthProvider } from './hooks/useAuth.js';
import PostSignup from "./pages/Post-Signup Page/Post-signup.jsx";

function App() {

  // Function to determine whether to render NavBar based on the current route
  const shouldRenderNavBar = () => {
    const excludedRoutes = ["/PostSignup"]; // Add routes where NavBar should be excluded
    return !excludedRoutes.includes(window.location.pathname);
  };

  return (
    <Router>
      <AuthProvider>
        {shouldRenderNavBar() && <NavBar />}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PostSignup" element={<PostSignup />} />
            <Route path="/trainee/" element={<TraineeDashboard />} />
          </Routes>
        </Container>
        <Footer />

      </AuthProvider>
    </Router>
  );
}

export default App;
