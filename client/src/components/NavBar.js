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
  const apiUrl = "http://localhost:3001";

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
          <Button color="inherit" href={`${apiUrl}/auth/github`}>
            Login with GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
