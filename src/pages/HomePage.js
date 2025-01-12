import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
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
import FilterListIcon from '@mui/icons-material/FilterList';


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // To store search query

  const handleSearch = (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;


    axios
    .get(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)

      .then((response) => {
        setMovies(response.data.Search || []);
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
            // Light background for contrast
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
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
                      <ClearIcon
                        sx={{ color: "#6B7280", fontSize: "1.5rem" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
        
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ marginTop: 4 }}>
          {loading && <LoadingPlaceholder />}
          {error && (
            <Box
              sx={{
                mt: 4,
                color: "red",
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              {error}
            </Box>
          )}
          {!loading && !error && <MovieGrid movies={movies} />}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
