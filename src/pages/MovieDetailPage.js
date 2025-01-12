import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
  Grid,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Star as StarIcon,
  Movie as MovieIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  Language as LanguageIcon,
  LocalAtm as LocalAtmIcon,
  EmojiEvents as EmojiEventsIcon,
  DateRange as DateRangeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Navbar from "./navbar/Navbar";
import { useAuth } from "../pages/authContext/AuthContext";
import AuthPage from "./auth/AuthPage";

const MovieDetailPage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const { userId, isLoggedIn } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [imdbID]);

  useEffect(() => {
    if (isLoggedIn && movie) {
      // Check if this movie is in the user's favorites list
      axios
        .get(`http://localhost:5000/getFavorites/${userId}`)
        .then((response) => {
          const favoritesList = response.data.favorites;
          setIsFavorite(favoritesList.includes(movie.imdbID));
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    }
  }, [movie, isLoggedIn, userId]);

  const getRuntime = (runtime) => {
    const [minutes] = runtime.split(" ");
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      // alert("You need to log in to add/remove favorites.");
      return;
    }

    const movieId = movie.imdbID;

    if (isFavorite) {
      // Remove from favorites (API Call)
      axios
        .post("http://localhost:5000/removeFavorite", { userId, movieId })
        .then(() => {
          setIsFavorite(false);
        })
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      // Add to favorites (API Call)
      axios
        .post("http://localhost:5000/addFavorite", { userId, movieId })
        .then(() => {
          setIsFavorite(true);
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "primary.main",
            textTransform: "capitalize",
            marginBottom: 3,
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Back to Search
        </Button>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              padding: 3,
              boxShadow: 6,
              borderRadius: "12px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
              position: "relative",
            }}
          >
            {/* Heart Icon for Favoriting */}
            <IconButton
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                color: isFavorite ? "red" : "grey",
              }}
              onClick={toggleFavorite}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>

            <CardMedia
              component="img"
              image={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              sx={{
                width: { xs: "100%", lg: "40%" },
                height: "auto",
                borderRadius: "12px",
                boxShadow: 2,
              }}
            />
            <CardContent
              sx={{
                flex: 1,
                marginLeft: { lg: 4 },
                marginTop: { xs: 3, lg: 0 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <MovieIcon color="primary" />
                {movie.Title}
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <DateRangeIcon color="action" /> <strong>Released:</strong>{" "}
                    {movie.Released}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <StarIcon color="warning" /> <strong>IMDb Rating:</strong>{" "}
                    {movie.imdbRating} / 10
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <LanguageIcon color="action" /> <strong>Language:</strong>{" "}
                    {movie.Language}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <LocalAtmIcon color="action" /> <strong>Box Office:</strong>{" "}
                    {movie.BoxOffice}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <EmojiEventsIcon color="action" />{" "}
                    <strong>Director:</strong> {movie.Director}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", display: "flex", gap: 1 }}
                  >
                    <InfoIcon color="action" /> <strong>Runtime:</strong>{" "}
                    {getRuntime(movie.Runtime)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ marginY: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                {movie.Genre.split(", ").map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: 1,
                }}
              >
                Plot:
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  paddingLeft: 2,
                }}
              >
                {movie.Plot}
              </Typography>
              <Divider sx={{ marginY: 2 }} />

              {/* Cast */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: 1,
                }}
              >
                Cast:
              </Typography>
              <Grid container spacing={2}>
                {movie.Actors.split(", ").map((actor, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        padding: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                        boxShadow: 2,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      {/* Avatar with Initials */}
                      <Avatar
                        sx={{
                          bgcolor: "secondary.main",
                          width: 56,
                          height: 56,
                          fontSize: 16,
                          textTransform: "uppercase",
                          boxShadow: 2,
                        }}
                      >
                        {actor[0]}
                      </Avatar>

                      {/* Actor Name */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          color: "#333",
                          letterSpacing: "0.5px",
                          wordWrap: "break-word",
                        }}
                      >
                        {actor}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 4,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                component={Link}
                to="/"
              >
                Back to Search
              </Button>
            </CardContent>
            {showAuthPopup && (
              <AuthPage onClose={() => setShowAuthPopup(false)} />
            )}
          </Card>
        )}
      </Container>
    </>
  );
};

export default MovieDetailPage;
