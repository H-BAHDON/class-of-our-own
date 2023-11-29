import React from 'react';
import { Box, Typography, Container, SvgIcon} from '@mui/material';
import "../style.css"

const MainContent = ({ selectedTab }) => {
  console.log('Selected Tab in MainContent:', selectedTab);

  return (
    <Container >
      <Box sx={{"maxWidth": "90%"}}>
        <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
          Welcome to Dashboard
        </Typography>
       
        <Box
          className="content"
          sx={{
            borderRadius: '16px',
            padding: '1.5rem',
            backgroundColor: 'white',
            width: '100%', 
            "maxWidth": "90%"
          }}
        >
          {selectedTab === 'overview' && (
            <Box>
              <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
                Hello asdJone Doe, welcome to your awesome dashboard!
              </Typography>
            </Box>
          )}

          {selectedTab === 'prDetails' && (
            <Box>
              <Typography variant="h4" sx={{ marginBottom: '1.5rem' }}>
                PR Details Section
              </Typography>
              <Typography variant="body1">Content specific to PR Details goes here.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;
