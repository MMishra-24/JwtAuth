const {prisma} = require("../config/db")
const constants = require("../config/constants")
// Function to list all movies for the currently logged-in user
const listMovies = async (req) => {
    try {
      const userId = req.user.id; //user information in the session
      const user = await prisma.user.findUnique({
        where: { id: userId,  isActive: constants.IS_ACTIVE},
        include: {
          movies: {
            where: {
              isActive: constants.IS_ACTIVE,
            }
          },
        }
      });
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
    const movieRating = parseFloat(rating)
    if (!Array.isArray(movieCast) || movieCast.some((item) => typeof item !== 'string')) {
      return res.status(400).json({ error: 'movieCast must be an array of strings' });
    }
    try {
      const movie = await prisma.movie.create({
        data: {
          name,
          rating: movieRating,
          movieCast,
          genre,
          releaseDate: new Date(releaseDate),
          userId: userId, // Associate the movie with the logged-in user
        },
        });
      res.status(201).json({"data": movie});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to add the movie' });
    }
  };

  const updateMovie = async (req, res) => {
    const { id, name, rating, movieCast, genre, releaseDate } = req.body;
    if(!id || !name || !rating || !movieCast || !genre || !releaseDate){
      res.status(400).json({ error: 'Unable to update the movie' });
    }
    
    if (!Array.isArray(movieCast) || movieCast.some((item) => typeof item !== 'string')) {
      return res.status(400).json({ error: 'movieCast must be an array of strings' });
    }
    try {
      const movie = await prisma.movie.update({
        where: { id: (parseInt(id)) },
        data: {
          name,
          rating: parseFloat(rating),
          movieCast,
          genre,
          releaseDate: new Date(releaseDate),
        },
      });
      res.status(200).json({data: movie}); // Redirect to the dashboard or movie list
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Unable to update the movie' });
    }
  };

  // Function to delete a movie
const deleteMovie = async (req, res) => {
  const { id } = req.body;
    try {
      const movie = await prisma.movie.update({
        where: { id: id },
        data: {
            isActive: constants.IS_NOT_ACTIVE
        },
      });
      res.status(200).json({data: movie}) // Redirect to the dashboard or movie list
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to delete the movie' });
    }
  };

  module.exports = {listMovies, addMovie, updateMovie, deleteMovie}