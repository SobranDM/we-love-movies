const knex = require("../db/connection");
const nestCritic = require("../utils/nestCritic");

// Method functions
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function update(updatedReview, reviewId) {
  await knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*")

  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((nestCritic))
}

module.exports = {
  read,
  destroy,
  update
}