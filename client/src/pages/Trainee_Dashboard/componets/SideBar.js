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
import SummarizeIcon from "@mui/icons-material/Summarize";
import MainContent from "./MainContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodePullRequest,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleTabClick = (tab) => {
    onTabClick(tab);
  };
  return (
    <Box sx={{ position: "relative", zIndex: 900 }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            height: "calc(100% - 75px)",

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
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" sx={{ opacity: open ? 1 : 0 }} />
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
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCodePullRequest}
                  style={{
                    color: "rgba(0, 0, 0, 0.54)",
                    paddingLeft: "2px",
                    paddingRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="PR Details"
                sx={{ opacity: open ? 1 : 0 }}
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
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faListCheck}
                  style={{
                    color: "rgba(0, 0, 0, 0.54)",
                    paddingLeft: "2px",
                    paddingRight: "5px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Milestones"
                sx={{ opacity: open ? 1 : 0 }}
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
        <MainContent selectedTab={selectedTab} />
      </Box>
    </Box>
  );
}
