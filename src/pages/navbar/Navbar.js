import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import { useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import AuthPage from "../auth/AuthPage";
import { useAuth } from "../authContext/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [anchorAvatar, setAnchorAvatar] = useState(null);

  const handleAvatarClick = (event) => setAnchorAvatar(event.currentTarget);
  const handleAvatarClose = () => setAnchorAvatar(null);

  const { isLoggedIn, username, login, logout } = useAuth();

  // Open and Close Handlers for Menus
  const handleMenuClick = (event) => setAnchorMenu(event.currentTarget);
  const handleMenuClose = () => setAnchorMenu(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1E2A38", // Darker blue for contrast
        height: "70px",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo2.png"
              alt="Logo"
              style={{
                width: "45px",
                height: "auto",
                borderRadius: "50%",
                marginRight: "12px",
                padding: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.5rem",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                display: { xs: "none", sm: "block" },
                transition: "color 0.3s ease",
                "&:hover": { color: "#F9A825" },
              }}
            >
              Movie Mania
            </Typography>
          </a>
        </Box>

        {/* Desktop Navigation (Buttons) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button
            sx={{
              color: "#fff",
              fontWeight: "600",
              textTransform: "capitalize",
              marginRight: "15px",
              "&:hover": {
                color: "#F9A825",
              },
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>

          <Button
            sx={{
              color: "#fff",
              fontWeight: "600",
              textTransform: "capitalize",
              marginRight: "15px",
              "&:hover": {
                color: "#F9A825",
              },
            }}
            onClick={() => navigate("/favorites")}
          >
            Favorites
          </Button>

          <Button
            sx={{
              color: "#fff",
              fontWeight: "600",
              textTransform: "capitalize",
              marginRight: "15px",
              "&:hover": {
                color: "#F9A825",
              },
            }}
            onClick={() => navigate("/about")}
          >
            About
          </Button>

          {isLoggedIn ? (
            <>
              <Avatar
                sx={{
                  bgcolor: deepPurple[500],
                  marginRight: 2,
                  cursor: "pointer",
                }}
                size="large"
                onClick={handleAvatarClick}
              >
                {username.slice(0, 2).toUpperCase()}
              </Avatar>
              <Menu
                anchorEl={anchorAvatar}
                open={Boolean(anchorAvatar)}
                onClose={handleAvatarClose}
                sx={{ mt: 1 }}
              >
                <MenuItem onClick={handleAvatarClose}>
                  <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleAvatarClose();
                    logout();
                  }}
                >
                  <Typography variant="inherit" color="error">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              sx={{
                color: "#fff",
                fontWeight: "600",
                textTransform: "capitalize",
                marginRight: "15px",
                "&:hover": {
                  color: "#F9A825",
                },
              }}
              onClick={() => setShowAuthPopup(true)}
            >
              Login
            </Button>
          )}
          {showAuthPopup && (
            <AuthPage onClose={() => setShowAuthPopup(false)} />
          )}
        </Box>

        {/* Hamburger Menu for Mobile */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
          {/* Avatar for Mobile on Left */}
         
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <SegmentIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Hamburger Menu Items */}
        <Menu
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/");
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/favorites");
            }}
          >
            Favorites
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/about");
            }}
          >
            About
          </MenuItem>
          
        </Menu>
        {isLoggedIn && (
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                marginRight: 2,
                cursor: "pointer",
              }}
              size="large"
              onClick={handleAvatarClick}
            >
              {username.slice(0, 2).toUpperCase()}
            </Avatar>
          )}
      </Toolbar>
    </AppBar>
  );
}
