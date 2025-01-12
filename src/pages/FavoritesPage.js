import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useAuth } from "./authContext/AuthContext";
import Navbar from "./navbar/Navbar";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]); // Only movie IDs
  const [moviesDetails, setMoviesDetails] = useState([]); // Store movie details
  const [loading, setLoading] = useState(true);
  const { userId, isLoggedIn } = useAuth(); // Get the logged-in user info
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch the user's favorite movie IDs first
      axios
        .get(`http://localhost:5000/getFavorites/${userId}`)
        .then((response) => {
          setFavorites(response.data.favorites);
          setLoading(false);

          // After fetching the movie IDs, fetch full movie details
          response.data.favorites.forEach((movieId) => {
            axios
              .get(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
              .then((movieResponse) => {
                // Append movie details to the list if it's not already in the state
                setMoviesDetails((prevDetails) => {
                  if (!prevDetails.some((movie) => movie.imdbID === movieId)) {
                    return [...prevDetails, movieResponse.data];
                  }
                  return prevDetails;
                });
              })
              .catch((err) =>
                console.error("Error fetching movie details", err)
              );
          });
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          setLoading(false);
        });
    } else {
      // User is not logged in, show loading state and no favorites
      setLoading(false);
    }
  }, [userId, isLoggedIn, apiKey]);

  const handleToggleFavorite = (movieId) => {
    if (!isLoggedIn) {
      alert("You need to log in to remove favorites.");
      return;
    }

    const isMovieInFavorites = favorites.includes(movieId);

    if (isMovieInFavorites) {
      // Remove from favorites
      axios
        .post("http://localhost:5000/removeFavorite", { userId, movieId })
        .then(() => {
          // Update favorites and movie details state
          setFavorites(favorites.filter((id) => id !== movieId));
          setMoviesDetails(
            moviesDetails.filter((movie) => movie.imdbID !== movieId)
          );
        })
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      // Add to favorites
      axios
        .post("http://localhost:5000/addFavorite", { userId, movieId })
        .then(() => {
          // Immediately update favorites
          setFavorites([...favorites, movieId]);

          // Fetch and add movie details immediately
          axios
            .get(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
            .then((movieResponse) => {
              setMoviesDetails((prevDetails) => {
                if (!prevDetails.some((movie) => movie.imdbID === movieId)) {
                  return [...prevDetails, movieResponse.data];
                }
                return prevDetails;
              });
            })
            .catch((err) => console.error("Error fetching movie details", err));
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            marginBottom: 4,
          }}
        >
          Your Favorite Movies
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
            <CircularProgress />
          </Box>
        ) : !isLoggedIn ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            Please login to see your favorite movies.
          </Typography>
        ) : favorites.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            No favorites yet. Add some movies to your favorites!
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {moviesDetails.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  {/* Heart Icon */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 10,
                      color: "red",
                    }}
                    onClick={() => handleToggleFavorite(movie.imdbID)}
                  >
                    <Favorite />
                  </IconButton>
                  <CardMedia
                    component="img"
                    image={
                      movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                    }
                    alt={movie.Title}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {movie.Title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {movie.Year} | {movie.Genre} | {movie.Director}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ marginTop: 2 }}
                      component={Link}
                      to={`/movie/${movie.imdbID}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default FavoritesPage;
