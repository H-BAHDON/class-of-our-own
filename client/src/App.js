import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import TraineeDashboard from "./pages/Trainee_Dashboard/TraineeDashboard.js";
import Home from "./pages/Home.js";
import Footer from "./components/Footer.js";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import PostSignup from "./pages/Post-Signup Page/Post-signup.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
}

function MainContent() {
  const { user } = useAuth();

  const shouldRenderNavBar = () => {
    const excludedRoutes = ["/PostSignup"];
    return !excludedRoutes.includes(window.location.pathname);
  };

  return (
    <>
      {shouldRenderNavBar() && <NavBar />}
      <Container
        style={{
          paddingTop: 75,
          minHeight: "100vh",
          backgroundColor: "#fffdfd",
        }}
      >
        <Routes>
          <Route path="/" element={user ? <TraineeDashboard /> : <Home />} />
          <Route path="/PostSignup" element={<PostSignup />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
