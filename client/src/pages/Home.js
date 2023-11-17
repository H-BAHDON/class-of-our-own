import Container from "@mui/material/Container";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CYFImage from "../assets/CYF-illustration.png";
import Section from "../components/Section";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <Container
     sx={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "100%",
        height: "100vh",
      }}
    >
      <Box marginTop="2rem" sx={{height: "50vh", margin:"0",}}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} textAlign={"left"}>
            <Typography variant="h4" component="h1" marginBottom="1rem">
              Revolutionizing Learning with CodeYourFuture's Tracker System
            </Typography>
            <Typography variant="body1" component="p" marginBottom="1.5rem">
              At CodeYourFuture, our groundbreaking tracker system transforms the learning experience for aspiring tech professionals. Dive into the world of coding with a personalized journey enriched by our innovative coursework and project tracking system.
            </Typography>
            <Typography variant="body1" component="p" marginBottom="2.5rem">
              Imagine a seamless process where trainees and volunteers collaborate effortlessly. Our tracker system meticulously monitors coursework progress and project milestones, providing a clear pathway to success for each trainee. Volunteers, the heart of our community, actively assess and guide trainees, fostering a collaborative and supportive learning environment that nurtures individual growth.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src={CYFImage}
              alt="A illustration of CYF"
              width="100%"
              height={400}
            />
          </Grid>
        </Grid>
      </Box>

      <Section />
      <AboutUs />
    </Container>
  );
};

export default Home;
