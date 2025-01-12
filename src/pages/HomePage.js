import React, { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import axios from "axios";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import {
  Typography,
  Container,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Navbar from "./navbar/Navbar";
import ClearIcon from "@mui/icons-material/Clear"; // Cross Icon for clearing search

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // To store search query

  const [featuredMovies, setFeaturedMovies] = useState([]); // Predefined featured movies
  const [noResults, setNoResults] = useState(false); // To track if no search results found

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  const validFeaturedMovies = featuredMovies.filter(movie => movie.Poster !== "N/A");


  useEffect(() => {
   
    fetchFeaturedMovies();
  }, []);

  const fetchFeaturedMovies = () => {
    setLoading(true);
    setError(null);
    
    
    axios
      .get(`https://www.omdbapi.com/?s=latest&apikey=${apiKey}&type=movie&language=hi`)
      .then((response) => {
        setFeaturedMovies(response.data.Search || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching featured movies. Please try again later.");
        setLoading(false);
      });
  };

  const handleSearch = (query) => {
    if (!query) {
      setSearchQuery(query);
      setMovies([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchQuery(query);

    axios
      .get(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then((response) => {
        const searchResults = response.data.Search || [];
        setMovies(searchResults);
        setNoResults(searchResults.length === 0); // If no results, set noResults to true
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  };

  // Clear Search Input
  const clearSearch = () => {
    setSearchQuery("");
    setMovies([]); 
    setNoResults(false); // Reset noResults state
    setError(null);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {/* Sticky Header Section */}
        <Box
          sx={{
            position: "sticky",
            top: 70, // Ensure it's below the navbar
            zIndex: 10,
            backgroundColor: "#f8f9fa",
            backdropFilter: "blur(19px) saturate(180%)", // Apply the backdrop filter
            paddingBottom: 4,
            marginBottom: 4,
            paddingTop: 0,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for effect
            borderRadius: "8px", // Rounded corners for the sticky container
          }}
        >
          <div className="text-center">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: "1.8rem",
                color: "#010408",
                letterSpacing: "1px",
                marginBottom: 2,
              }}
            >
              Movie Search
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: "#6B7280",
                fontSize: "1.1rem",
                fontWeight: 500,
                marginBottom: 3,
              }}
            >
              Find movies by title, year, or actor.
            </Typography>
          </div>

          {/* Search Bar with Cross Icon */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <TextField
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search movies..."
              sx={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "30px", // Round edges for modern look
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px", // Apply rounding to input
                },
                "& .MuiInputBase-input": {
                  padding: "8px 16px", // Smaller padding for compact look
                  fontSize: "1rem",
                },
              }}
              InputProps={{
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={clearSearch}
                      sx={{
                        padding: "6px",
                      }}
                    >
                      <ClearIcon sx={{ color: "#6B7280", fontSize: "1.5rem" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Featured Movies Section */}
       
{/* Featured Movies Section */}
{!searchQuery && !loading && !error && (
  <Box sx={{ marginTop: 4 }}>
    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
      Popular Movies
    </Typography>
    {validFeaturedMovies.length > 0 ? (
      <MovieGrid movies={validFeaturedMovies} />
    ) : (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        No Popular movies available. Please try another search.
      </Typography>
    )}
  </Box>
)}


        {/* Search Results Section */}
        <Box sx={{ marginTop: 4 }}>
          {loading && <LoadingPlaceholder />}
          {error && (
            <Box sx={{ mt: 4, color: "red", textAlign: "center", fontSize: "1.2rem" }}>
              {error}
            </Box>
          )}
          {noResults && !loading && !error && (
            <Box sx={{ mt: 4, color: "red", textAlign: "center", fontSize: "1.2rem" }}>
              Movies Not Found
            </Box>
          )}
          {!loading && !error && !noResults && <MovieGrid movies={movies} />}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
