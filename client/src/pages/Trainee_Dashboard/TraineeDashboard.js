import React, { useState } from 'react';
import Sidebar from "./componets/SideBar";
import MainContent from "./componets/MainContent";
import { Container, Box } from "@mui/material";
import CurrentMilestone from "../../components/CurrentMilestone"
import CodewarsFactor from '../../components/CodewarsFactor';

const TraineeDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
          <>
            <Sidebar selectedTab={selectedTab} onTabClick={handleTabClick} />
            <CodewarsFactor />
        
            <MainContent selectedTab={selectedTab} />
          </> 
  );
};

export default TraineeDashboard;
