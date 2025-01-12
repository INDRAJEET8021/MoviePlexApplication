import React, { useState, useRef, useEffect } from "react";
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
  const [showAuthPopup, setShowAuthPopup] = useState(false); // State to control AuthPage visibility
  const [anchorAvatar, setAnchorAvatar] = useState(null);

  const modalRef = useRef(null); // Ref for the AuthPage modal
  const { isLoggedIn, username, logout } = useAuth();

  // Handle Avatar Click
  const handleAvatarClick = (event) => setAnchorAvatar(event.currentTarget);
  const handleAvatarClose = () => setAnchorAvatar(null);

  // Open and Close Handlers for Menus
  const handleMenuClick = (event) => setAnchorMenu(event.currentTarget);
  const handleMenuClose = () => setAnchorMenu(null);

  // Close menu and show Auth popup for Login
  const handleLoginClick = () => {
    setAnchorMenu(null); // Close the menu
    setShowAuthPopup(true); // Show the Auth popup
  };

  // Close AuthPage when clicking outside of the modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowAuthPopup(false); // Close the modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1E2A38", height: "70px", boxShadow: 3 }}>
      <Toolbar>
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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
            <Typography sx={{ fontWeight: "700", fontSize: "1.5rem", color: "#ffffff", display: { xs: "none", sm: "block" }, "&:hover": { color: "#F9A825" } }}>
              Movie Mania
            </Typography>
          </a>
        </Box>

        {/* Desktop Navigation (Buttons) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button sx={{ color: "#fff", fontWeight: "600", marginRight: "15px", "&:hover": { color: "#F9A825" } }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button sx={{ color: "#fff", fontWeight: "600", marginRight: "15px", "&:hover": { color: "#F9A825" } }} onClick={() => navigate("/favorites")}>
            Favorites
          </Button>
          <Button sx={{ color: "#fff", fontWeight: "600", marginRight: "15px", "&:hover": { color: "#F9A825" } }} onClick={() => navigate("/about")}>
            About
          </Button>

          {isLoggedIn ? (
            <>
              <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 2 }} size="large" onClick={handleAvatarClick}>
                {username.slice(0, 2).toUpperCase()}
              </Avatar>
              <Menu anchorEl={anchorAvatar} open={Boolean(anchorAvatar)} onClose={handleAvatarClose}>
                <MenuItem onClick={handleAvatarClose}>
                  <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleAvatarClose(); logout(); }}>
                  <Typography variant="inherit" color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button sx={{ color: "#fff", fontWeight: "600", marginRight: "15px", "&:hover": { color: "#F9A825" } }} onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Box>

        {/* Hamburger Menu for Mobile */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
         
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuClick}>
            <SegmentIcon fontSize="large" />
          </IconButton>
          {isLoggedIn && <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 2 }} size="large" onClick={handleAvatarClick}>{username.slice(0, 2).toUpperCase()}</Avatar>}
        </Box>

        {/* Hamburger Menu Items */}
        <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { handleMenuClose(); navigate("/favorites"); }}>Favorites</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate("/about"); }}>About</MenuItem>
          {isLoggedIn ? (
            <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
              <Typography variant="inherit" color="error">Logout</Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={() => { handleMenuClose(); setShowAuthPopup(true); }}>
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>

      {/* Show the Auth Popup (Login/Register) */}
      {showAuthPopup && (
        <div ref={modalRef}>
          <AuthPage onClose={() => setShowAuthPopup(false)} />
        </div>
      )}
    </AppBar>
  );
}
