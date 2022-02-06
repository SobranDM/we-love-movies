const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const movieExists = require("./movies.service");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

async function theatersShowing(req, res) {
  const data = await service.theatersShowing();
  res.json({ data });
}

function reviewsForMovie(req, res) {

}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  theatersShowing: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersShowing)],
  reviewsForMovie: [asyncErrorBoundary(reviewsForMovie)]
}