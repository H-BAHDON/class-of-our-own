import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';

const Section = () => {
  const sectionItems = [
    {
      id: 1,
      icon: <CodeIcon sx={{ fontSize: 100 }} color="secondary" />,
      sentence:
        'Empowering trainees to join our community and contribute to real-world projects',
    },
    {
      id: 2,
      icon: <Diversity3Icon sx={{ fontSize: 100 }} color="warning" />,
      sentence:
        'Fostering collaboration among volunteers to guide and support trainees',
    },
    {
      id: 3,
      icon: <TerminalIcon sx={{ fontSize: 100 }} color="success" />,
      sentence:
        'Providing a learning environment with flexible programs and opportunities',
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {sectionItems.map((item) => (
        <Grid
          item
          xs={12}
          md={3.5}
          minHeight={300}
          key={item.id}
          sx={{
            textAlign: 'center',
            padding: '30px',
            width: '200px',
            borderRadius: '10px',
            margin: '10px !important',
            fontFamily: "system-ui",
          }}
        >
          {item.icon}
          <Typography>{item.sentence}</Typography>
        </Grid>
      ))}
    </Box>
  );
};

export default Section;
