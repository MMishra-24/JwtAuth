import React, { useState } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons'; // Import edit and delete icons
import * as constants from '../../config/constants';
import './MovieList.css';

function MovieList({ movies, setMovies }) {
  console.log(movies);
  const [editMode, setEditMode] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState({
    id: null,
    name: '',
    rating: 0,
    movieCast: [],
    genre: '',
    releaseDate: '',
  });

  const handleEdit = (movieId) => {
    setEditMode(movieId);
    const movieToEdit = movies.find((movie) => movie.id === movieId);
    setUpdatedMovie({ ...movieToEdit });
  };

  const handleUpdate = async () => {
    try {
      // Send a PATCH request to backend to update the movie
      const token = localStorage.getItem('token');
      await axios.patch(
        constants.HOST_URL + `/movie`,
        updatedMovie,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Update the movie list
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === updatedMovie.id ? { ...updatedMovie } : movie
        )
      );
      setEditMode(null);
      setUpdatedMovie({
        id: null,
        name: '',
        rating: 0,
        movieCast: [],
        genre: '',
        releaseDate: '',
      });
    } catch (error) {
      console.error('Update movie error:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedMovie({
      id: null,
      name: '',
      rating: 0,
      movieCast: [],
      genre: '',
      releaseDate: '',
    });
  };

  const handleDelete = async (movieId) => {
    try {
      // Send a DELETE request to your backend to delete the movie
      const token = localStorage.getItem('token');
      await axios.delete(constants.HOST_URL + `/movie`, 
      {
        headers: {
          Authorization: token,
        },
        data: {
          id: movieId,
        },
      });
      // Update the movie list
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error('Delete movie error:', error);
    }
  };

  return (
    <div>
      <h2>Movie List</h2>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Cast</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              {editMode === movie.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedMovie.name}
                      onChange={(e) =>
                        setUpdatedMovie({ ...updatedMovie, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedMovie.rating}
                      onChange={(e) =>
                        setUpdatedMovie({ ...updatedMovie, rating: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedMovie.movieCast.join(', ')}
                      onChange={(e) =>
                        setUpdatedMovie({ ...updatedMovie, movieCast: e.target.value.split(', ') })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedMovie.genre}
                      onChange={(e) =>
                        setUpdatedMovie({ ...updatedMovie, genre: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={updatedMovie.releaseDate}
                      onChange={(e) =>
                        setUpdatedMovie({ ...updatedMovie, releaseDate: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{movie.name}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.movieCast.join(', ')}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseDate.substring(0, 10)}</td>
                  <td>
                    <PencilSquare
                      className="edit-icon"
                      onClick={() => handleEdit(movie.id)}
                    />
                    <Trash
                      className="delete-icon"
                      onClick={() => handleDelete(movie.id)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );



}

export default MovieList;
