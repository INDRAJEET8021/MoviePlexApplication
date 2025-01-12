import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import AuthPage from "../pages/auth/AuthPage";
import { useAuth } from "../pages/authContext/AuthContext";

const MovieGrid = ({ movies }) => {
  const { isLoggedIn } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [favState, setFavState] = useState(false);

  // Update the favState whenever login status changes
  useEffect(() => {
    if (!isLoggedIn) {
      // Reset favorite state when user logs out
      setFavState(false);
    } else {
      setFavState(true);
    }
  }, [isLoggedIn]); // Re-run when `isLoggedIn` changes

  const handleShowAuthPopup = () => {
    setShowAuthPopup(true);
  };

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
  };

  if (!movies.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", margin: "2rem" }}>
        No movies found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
          <MovieCard
            movie={movie}
            onAuthRequired={handleShowAuthPopup}
            favState={favState} // Pass favState to MovieCard
          />
        </Grid>
      ))}
      {showAuthPopup && <AuthPage onClose={handleCloseAuthPopup} />}
    </Grid>
  );
};

export default MovieGrid;
