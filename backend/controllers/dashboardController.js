//For Register Page
const { listMovies } = require("./movieController")
const dashboardView = async (req, res) => {
  try {
    const movies = await listMovies(req); // Call listMovies and capture the movie list
    res.status(200).json({movies: movies})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch movies' });
  }
  };
  module.exports = {
    dashboardView,
  };