const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    return next();
  }
  return next ({
    status: 404,
    message: `Review ${reviewId} cannot be found.`
  })
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204)
}

async function update(req, res) {
  const { reviewId } = req.params;
  const result = await service.update(req.body.data, reviewId);
  res.status(200).json({ data: result });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}