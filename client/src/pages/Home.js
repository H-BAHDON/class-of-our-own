import Container from "@mui/material/Container";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CYFImage from "../assets/CYF-illustration.png";

const Home = () => {
  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          marginY: "25px",
          maxWidth: "900px",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Welcome to 'A Class of Our Own'
          </Typography>
        </Box>
        <Box marginTop={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={CYFImage}
                alt="A illustration of CYF"
                width="100%"
                height={400}
              />
            </Grid>
            <Grid item xs={12} md={6} textAlign={"left"}>
              <Typography variant="body1" component="p">
                At In A Class of Our Own," our commitment is to empower Code
                Your Future (CYF) trainees on their journey towards employment.
                In partnership with the trainee tracker system, our project is
                designed to provide a personalized experience within the CYF
                curriculum. While there's a common milestone for all trainees,
                our platform facilitates tracking and evaluation for both
                trainees and volunteers.
              </Typography>
              <Typography variant="body1" component="p" marginY={3}>
                Volunteers play a crucial role in assessing and guiding trainees
                based on their progress, contributing to a collaborative and
                supportive learning community.
              </Typography>
              <Typography variant="h5" component="h2" textAlign={"center"}>
                Join us on this journey of empowerment and collaboration at "In
                A Class of Our Own.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
