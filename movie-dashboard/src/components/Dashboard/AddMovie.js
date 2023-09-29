import React, { useState } from 'react';
import axios from 'axios';
import * as constants from '../../config/constants';

function AddMovie({ setMovies }) {
  const [newMovie, setNewMovie] = useState({
    name: '',
    rating: 0,
    movieCast: [],
    genre: '',
    releaseDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "movieCast"){
      let movieCast = value.split(',').map((item) => item.trim());;
      setNewMovie({
        ...newMovie,
        [name]: movieCast,
      })
    } else{
      setNewMovie({
        ...newMovie,
        [name]: value,
      });
    }
    
  };

  const handleAddMovie = async () => {
    try {
      // Send a POST request to your backend to add a new movie
      const token = localStorage.getItem('token');
      const response = await axios.post(
        constants.HOST_URL + '/movie',
        newMovie, // Send the entire newMovie object
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const newUpdatedMovie = {...newMovie, id: response.data.data.id}
      // Update the movie list
      setMovies((prevMovies) => [...prevMovies, newUpdatedMovie]);
      // Reset the form
      setNewMovie({
        id: null,
        name: '',
        rating: 0,
        movieCast: [],
        genre: '',
        releaseDate: '',
      });
    } catch (error) {
      console.error('Add movie error:', error);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Movie Name"
        name="name"
        value={newMovie.name}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Rating"
        name="rating"
        value={newMovie.rating}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cast (comma-separated)"
        name="movieCast"
        value={newMovie.movieCast}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Genre"
        name="genre"
        value={newMovie.genre}
        onChange={handleChange}
      />
      <input
        type="date"
        placeholder="Release Date"
        name="releaseDate"
        value={newMovie.releaseDate}
        onChange={handleChange}
      />
      <button onClick={handleAddMovie}>Add</button>
    </div>
  );
}

export default AddMovie;
