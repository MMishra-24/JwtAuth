import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import { useNavigate } from 'react-router-dom'; 
import * as constants from '../../config/constants'

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's favorite movies using the JWT token
    const token = localStorage.getItem('token');
    axios
      .get(constants.HOST_URL+'/movie', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Fetching movies error:', error);
      });
  }, []);

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <MovieList movies={movies} setMovies={setMovies} />
      <AddMovie setMovies={setMovies} />
    </div>
  );
}

export default Dashboard;
