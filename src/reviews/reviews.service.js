const knex = require("../db/connection");
const nestCritic = require("../utils/nestCritic");

// Middleware functions
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await read(reviewId);
  if (review) {
    return next();
  }
  return next ({
    status: 404,
    message: `Review ${reviewId} cannot be found.`
  })
}

// Method functions
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId });
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function update(updatedReview) {
  await knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
  let review = await knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select(
      "reviews.*",
      "critics.critic_id",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at as critic_created_at",
      "critics.updated_at as critic_updated_at"
  )
  .where({ movie_id: movieId })
  .first()
review = nestCritic(review);
return review;
}

module.exports = {
  reviewExists,
  destroy,
  update
}