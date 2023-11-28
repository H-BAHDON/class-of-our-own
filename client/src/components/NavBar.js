import * as React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";
import GitHubLoginButton from "./GitHubLoginButton";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const handleLoginClick = () => {
    login();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "2px",
          backgroundImage: "linear-gradient(to bottom, #f6f4f4, #e3e2e0)",
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
          {!loading && (
            <Button
              color="inherit"
              sx={{
                color: "#333",
                textDecoration: "none",
                margin: "0 10px",
                "&:hover": {
                  color: "#555",
                },
              }}
              onClick={user ? undefined : handleLoginClick}
            >
              {user && user.userInfo ? (
                `Welcome, ${user.userInfo.name}!`
              ) : (
                <GitHubLoginButton />
              )}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
