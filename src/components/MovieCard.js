import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

import { useAuth } from "../pages/authContext/AuthContext";
import axios from "axios";

const MovieCard = ({ movie, onAuthRequired, favState }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const placeholderImage = "/placeholder.png";

  const { userId, isLoggedIn } = useAuth(); // Get logged-in user info

  // Function to check if the movie is in favorites when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user's favorite movies
      axios
        .get(`https://movieplexapplication.onrender.com/getFavorites/${userId}`)
        .then((response) => {
          // Check if movie is in the user's favorites list
          setFavoritesList(response.data.favorites);
          if (response.data.favorites.includes(movie.imdbID)) {
            setIsFavorite(true);
          }
        })
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [userId, isLoggedIn, movie.imdbID]);

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      // You could prompt the user to log in if they're not already
      onAuthRequired();

      return;
    }

    const movieId = movie.imdbID;

    // Toggle favorite status
    if (isFavorite) {
      // Remove from favorites (API Call)
      axios
        .post("https://movieplexapplication.onrender.com/removeFavorite", {
          userId,
          movieId,
        })
        .then((response) => {
          setIsFavorite(false);
          setFavoritesList(favoritesList.filter((id) => id !== movieId));
        })
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      // Add to favorites (API Call)
      axios
      // http://localhost:5000
        .post("https://movieplexapplication.onrender.com/addFavorite", {
          userId,
          movieId,
        })
        .then((response) => {
          setIsFavorite(true);
          setFavoritesList((prevFavorites) => [...prevFavorites, movieId]);
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 4,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, transform 0.3s ease", // Added zoom effect
        "&:hover": {
          boxShadow: 8,
          transform: "scale(1.05)", // Slight zoom effect on hover
        },
        height: "100%",
        backgroundColor: "white",
        position: "relative", // To position the heart icon correctly
      }}
    >
      {/* Card Media (Image) */}
      <Box
        sx={{
          height: 250, // Increased image height
          backgroundColor: "#333", // Black background when image is missing
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Hide any overflow of image
        }}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
          alt={movie.Title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image fills the space without distorting
            objectPosition: "center",
            borderRadius: "8px", // Optional: Adds rounded corners for the image
          }}
        />
      </Box>

      {/* Divider after Image */}
      <Divider sx={{ marginY: 1 }} />

      {/* Heart Icon for Favoriting */}
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          color: isFavorite && favState ? "red" : "grey",
        }}
        onClick={toggleFavorite}
      >
        {isFavorite && favState ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      {/* Card Content */}
      <CardContent sx={{ padding: "1rem", flexGrow: 1, height: "auto" }}>
        {/* Movie Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: { xs: "1rem", sm: "1.125rem" }, // Responsive font size
          }}
          title={movie.Title}
        >
          {movie.Title || "Unknown Title"}
        </Typography>

        {/* Movie Year */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontStyle: movie.Year ? "normal" : "italic",
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {movie.Year || "Year not available"}
        </Typography>

        {/* View Details Button */}
        <Box sx={{ textAlign: "center", marginTop: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            component={Link}
            to={`/movie/${movie.imdbID}`}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              padding: "8px 16px",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
