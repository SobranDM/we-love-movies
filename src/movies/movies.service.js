const knex = require("../db/connection");

// Middleware functions
async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found with id ${movieId}.`});
}

// Method handlers
function list() {
  if (req.query.is_showing) {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .select("movies.*")
      .where({ is_showing: true });
  } else {
    return knex("movies").select("*");
  }
}

function read(movieId) {
  return knex("movies").select("*").where( { movie_id: movieId }).first();
}

function theatersShowing() {
  const { movieId } = req.params;

  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id: movieId });
}

module.exports = {
  list,
  read,
  movieExists,
  theatersShowing
}