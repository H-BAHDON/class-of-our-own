import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const TrackingSystem = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1300px',
        padding: '50px',
      }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img
            src="https://codeyourfuture.io/wp-content/uploads/2021/05/outreach.jpg"
            alt="Tracking System"
            style={{
              width: '100%', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={700} sx={{ paddingBottom: '15px', fontFamily: "system-ui"}}>
            Empowering Lives through <br/> CodeYourFuture
          </Typography>
          <Typography
            sx={{
              opacity: '0.7',
              paddingBottom: '30px',
              fontSize: '18px',
              
            }}
          >
            Our tracking system is designed to empower both trainees and volunteers at CodeYourFuture. Trainees embark on a transformative journey, guided by dedicated volunteers who play a crucial role in assessing and supporting their progress.
          </Typography>
          {/* <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            GET INVOLVED
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrackingSystem;
