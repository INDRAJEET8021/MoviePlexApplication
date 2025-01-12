import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import Navbar from "./navbar/Navbar";

const AboutPage = () => {
  const handleContact = () => {
    window.location.href = "mailto:indrejeetrai903@gmail.com";
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {/* Introduction */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            About Our Project
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", marginTop: 2 }}
          >
            A platform for discovering and managing your favorite movies!
          </Typography>
        </Box>

        {/* Technologies */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main", marginBottom: 2 }}
          >
            Technologies Used
          </Typography>
          <Grid container spacing={3}>
            {/* Frontend Section */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                  alt="React Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    marginBottom: 2,
                    mx: "auto",
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Frontend
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    The frontend is built with React, providing a dynamic and
                    responsive user interface.
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Chip
                      label="React"
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <Chip
                      label="Material-UI"
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <Chip
                      label="TailwindCSS"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Backend Section */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image="NodeJs.png"
                  alt="Node.js Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    marginBottom: 2,
                    mx: "auto",
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Backend
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    The backend is powered by Node.js and Express, handling user
                    data and interactions.
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Chip
                      label="Node.js"
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <Chip
                      label="Express.js"
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    />
                    <Chip label="MySQL DB" color="primary" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main", marginBottom: 2 }}
          >
            Key Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  padding: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                  height: "100%", // Ensures all cards have the same height
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Zoom effect
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Movie Search
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Search movies by title and view detailed information,
                  including plot, rating, and cast.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  padding: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                  height: "100%", // Ensures all cards have the same height
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Zoom effect
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Favorites List
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Save your favorite movies and easily access them from your
                  profile.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  padding: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                  height: "100%", // Ensures all cards have the same height
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Zoom effect
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Movie Details
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Get comprehensive details about each movie including the
                  director, runtime, and box office information.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main", marginBottom: 2 }}
          >
            Meet the Developer
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Team Member */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  padding: 3,
                  boxShadow: 4,
                  textAlign: "center",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: 2,
                    mx: "auto",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    src="/DevImg.jpg"
                    alt="Team Member"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Indrajeet Rai
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  FullStack Backend Developer
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <IconButton
                    href="https://github.com/INDRAJEET8021"
                    target="_blank"
                  >
                    <GitHubIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                  <IconButton
                    href="https://www.linkedin.com/in/indrajeet-rai-0bb695229/"
                    target="_blank"
                    sx={{ marginLeft: 1 }}
                  >
                    <LinkedInIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Contact */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            For more information, please feel free to reach out.
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleContact}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AboutPage;
