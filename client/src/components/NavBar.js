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
            <Box style={{ height: "4rem", padding: "0px" }}>
              <Logo />
            </Box>
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
              <div style={{ marginLeft: "0.75rem" }}>
                <Avatar
                  alt="Trainne github pic"
                  src={user.userInfo.avatar_url}
                  sx={{ width: 56, height: 56 }}
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
