import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import TraineeDashboard from "./pages/Trainee_Dashboard/TraineeDashboard.js";
import Home from "./pages/Home.js";
import Footer from "./components/Footer.js";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import PostSignup from "./pages/Post-Signup Page/Post-signup.jsx";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

function MainContent() {
  const { user } = useAuth();

  const shouldRenderNavBar = () => {
    return true;
  };

  return (
    <>
      {shouldRenderNavBar() && <NavBar />}
      <Container
        style={{
          paddingTop: 75,
          minHeight: "100vh",
          backgroundColor: "#faf8f6",
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
