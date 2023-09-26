const config = require("../config/config") 
const prisma = require("../config/db");
// Function to list all movies for the currently logged-in user
const listMovies = async (req) => {
    try {
      const userId = req.user.id; 
      console.log(userId); // Assuming you have user information in the session
      const user = await prisma.user.findUnique({
        where: { id: userId,  isActive: config.IsActive},
        include: {
          movies: {
            where: {
              isActive: config.IsActiveDefault,
            }
          },
        }
      });
      console.log(user);
      console.log(user.movies);
      return user.movies; // Return the list of movies
    } catch (error) {
      console.error(error);
      throw new Error('Unable to fetch movies');
    }
  };

  // Function to add a new movie for the currently logged-in user
const addMovie = async (req, res) => {
    const userId = req.user.id; // Assuming you have user information in the session
    const { name, rating, movieCast, genre, releaseDate } = req.body;
    try {
      const movie = await prisma.user.create({
        where: {id: userId},
        include: {
          movie: {
            data: {
              name,
              rating,
              movieCast,
              genre,
              releaseDate: new Date(releaseDate),
              userId: userId, // Associate the movie with the logged-in user
            },
          }
        }
        
      });
      res.redirect('/movies');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to add the movie' });
    }
  };

  const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { name, rating, movieCast, genre, releaseDate } = req.body;
    try {
      await prisma.movie.update({
        where: { id: parseInt(id) },
        data: {
          name,
          rating,
          movieCast,
          genre,
          releaseDate: new Date(releaseDate),
        },
      });
      res.redirect('/dashboard'); // Redirect to the dashboard or movie list
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to update the movie' });
    }
  };

  // Function to delete a movie
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.movie.delete({
        where: { id: parseInt(id) },
        data: {
            isActive: config.IsNotActive
        },
      });
      res.redirect('/dashboard'); // Redirect to the dashboard or movie list
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to delete the movie' });
    }
  };

  module.exports = {listMovies, addMovie, updateMovie, deleteMovie}