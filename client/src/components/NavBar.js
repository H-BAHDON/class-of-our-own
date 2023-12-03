// NavBar.js
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f8f2ed",
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
              sx={{
                color: "black",
                fontSize: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Welcome, {user.userInfo.name}!
              <div style={{ marginLeft: "0.5rem" }}>
                <Avatar
                  alt="Trainne github pic"
                  src={user.userInfo.avatar_url}
                />
              </div>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
