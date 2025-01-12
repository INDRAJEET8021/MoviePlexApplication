import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './pages/authContext/AuthContext';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <AuthProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
