import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;


  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, [imdbID]);
  
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="mt-4 mb-4" />
      <p>{movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetail;
