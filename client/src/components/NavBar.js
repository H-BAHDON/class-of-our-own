import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import Logo from "./Logo";

const NavBar = () => {
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3002/auth/github");
    const data = await response.json();
    console.log(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f8f2ed", color: "#1c1e21" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <div style={{ height: "2rem" }}>
              <Logo />
            </div>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login with GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
