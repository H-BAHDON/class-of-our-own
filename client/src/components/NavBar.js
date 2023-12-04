import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        width: "100vw",
        maxHeight: "65px",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ecebea",
          padding: "2px",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <div style={{ height: "3.5rem" }}>
              <Logo />
            </div>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {!loading && user && user.userInfo && (
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "black", fontSize: "1rem" }}
            >
              Welcome, {user.userInfo.name}!
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
