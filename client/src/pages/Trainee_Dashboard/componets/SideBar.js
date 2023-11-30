import React, { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
} from "@mui/material";

import {useAuth} from "../../../hooks/useAuth"

const Sidebar = ({ selectedTab, onTabClick }) => {

  const handleTabClick = (tab) => {
    onTabClick(tab);
  };

  return (
    <Paper className='test' elevation={3} sx={{ position: "fixed", top: "auto", left: 0, height: "90%", overflowY: "auto", "width": "10%" }}>

      <List sx={{ pl: 3, pb: 3, paddingLeft: 0, listStyle: "none" }}>
        <ListItem
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".7rem 1.75rem",
            cursor: "pointer",
            backgroundColor: selectedTab === 'overview' ? '#f0f0f0' : 'inherit',
          }}
          onClick={() => handleTabClick('overview')}
        >
          <i className="uil-estate fa-fw"></i>
          <ListItemText sx={{ fontSize: "18px", fontFamily: "Montserrat", marginRight: "0.7rem", color: "black" }} primary="Overview" />
        </ListItem>

        <ListItem
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".7rem 1.75rem",
            cursor: "pointer",
            backgroundColor: selectedTab === 'prDetails' ? '#f0f0f0' : 'inherit',
          }}
          onClick={() => handleTabClick('prDetails')}
        >
          <i className="uil-estate fa-fw"></i>
          <ListItemText sx={{ fontSize: "18px", fontFamily: "Montserrat", marginRight: "0.7rem", color: "black" }} primary="PR Detail" />
        </ListItem>

        <Divider />
      </List>

      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3, display: "flex", justifyContent: "center", alignItems: "flex-end", flexDirection: "column" }}>
        <Box sx={{ mb: 2, borderBottom: "1px solid #2a2b3c", margin: "2px" }}>
          <Typography variant="subtitle1" >
          {/* {userInfo.name} */}
          </Typography>
          <Button variant="body2">logout</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Sidebar;
