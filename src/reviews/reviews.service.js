const knex = require("../db/connection");
const nestCritic = require("../utils/nestCritic");

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
  return knex("reviews")
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
  .then((reviews) => reviews.map(nestCritic))
}

module.exports = {
  destroy,
  update
}