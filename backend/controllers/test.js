const prisma = require('../config/db');


const addMovie = async () => {
  const userId = 3; // Assuming you have user information in the session
  console.log("dkfjslkjd");
  const name = "titanic";
  const rating = 8.3;
  const movieCast = "actor, actress";
  const genre = "romance";
  const releaseDate = "2013-11-15 12:51:18";
  try {
    prisma.movie.create({
      data: {
        name,
        rating,
        movieCast,
        genre,
        releaseDate: new Date(releaseDate),
        userId: userId, // Associate the movie with the logged-in user
      },
    });
  } catch (error) {
    console.error(error);
  }
};

addMovie();