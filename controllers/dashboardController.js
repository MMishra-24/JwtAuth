//For Register Page
const { listMovies } = require("./movieController")
const dashboardView = async (req, res) => {
  try {
    const movies = await listMovies(req); // Call listMovies and capture the movie list
    res.render('dashboard', { 
      user: req.user,
      movies: movies 
    }); // Render the dashboard view with the movie list
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch movies' });
  }
  };
  module.exports = {
    dashboardView,
  };