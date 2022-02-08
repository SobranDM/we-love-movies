const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie) {
      res.locals.movie = movie;
      return next();
  }
  return next({
      status: 404,
      message: `Movie cannot be found with id ${movieId}.`,
  });
}

async function list(req, res) {
  if (req.query.is_showing === "true") {
    const data = await service.listShowing();
  } else {
    const data = await service.list();
  }
  
  res.json({ data });
}

function read(req, res) {
  const data = res.locals.movie
  res.json({ data });
}

async function theatersShowing(req, res) {
  const { movieId } = req.params;
  const data = await service.theatersShowing(movieId);
  res.status(200).json({ data });
}

async function reviewsForMovie(req, res) {
  const { movieId } = req.params;
  const data = await service.reviewsForMovie(movieId);
  res.status(200).json({ data });
}

module.exports = {
  list,
  read: [movieExists, read],
  theatersShowing: [movieExists, theatersShowing],
  reviewsForMovie: [movieExists, reviewsForMovie]
}