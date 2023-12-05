import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodePullRequest,
  faListCheck,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import MainContent from "./MainContent";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../../hooks/useAuth";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: theme.zIndex.drawer,

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ selectedTab, onTabClick }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabClick = (tab) => {
    onTabClick(tab);
  };

  const handleLogout = () => {
    logout();
    handleTabClick("logout");
  };

  return (
    <Box sx={{ position: "relative", zIndex: 900 }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            height: "calc(100% - 75px)",
            backgroundColor: "#fafafa",
            top: 75,
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? (
              theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {/* Overview */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleTabClick("overview")}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "5px",
                backgroundColor:
                  selectedTab === "overview" ? "#a00000" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedTab === "overview" ? "white" : "",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Overview"
                sx={{
                  opacity: open ? 1 : 0,
                  color: selectedTab === "overview" ? "white" : "",
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* PR Details */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleTabClick("prDetails")}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "5px",
                backgroundColor:
                  selectedTab === "prDetails" ? "#a00000" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedTab === "prDetails" ? "white" : "",
                }}
              >
                <FontAwesomeIcon
                  icon={faCodePullRequest}
                  style={{
                    color: selectedTab === "prDetails" ? "white" : "",
                    paddingLeft: "2px",
                    paddingRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="PR Details"
                sx={{
                  opacity: open ? 1 : 0,
                  color: selectedTab === "prDetails" ? "white" : "",
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* Milestones */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleTabClick("Milestones")}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "5px",
                backgroundColor:
                  selectedTab === "Milestones" ? "#a00000" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedTab === "Milestones" ? "white" : "",
                }}
              >
                <FontAwesomeIcon
                  icon={faListCheck}
                  style={{
                    color: selectedTab === "Milestones" ? "white" : "",
                    paddingLeft: "2px",
                    paddingRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Milestones"
                sx={{
                  opacity: open ? 1 : 0,
                  color: selectedTab === "Milestones" ? "white" : "",
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* Divider */}
          <Divider />

          {/* Logout */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              marginBottom: "3rem",
            }}
            onClick={handleLogout}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "5px",
                backgroundColor:
                  selectedTab === "logout" ? "#a00000" : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: selectedTab === "logout" ? "white" : "",
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ paddingLeft: "2px", paddingRight: "5px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  color: selectedTab === "logout" ? "white" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: (theme) => ({
            width: open
              ? `calc(100% - ${theme.spacing(20)})`
              : "calc(100% - 1px)",
          }),
          marginLeft: (theme) => (open ? theme.spacing(20) : 1),
        }}
      >
        <MainContent selectedTab={selectedTab} open={open} />
      </Box>
    </Box>
  );
}
