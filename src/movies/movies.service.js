const knex = require("../db/connection");
const nestCritic = require("../utils/nestCritic");

// Method handlers
function list() {
    if (req.query.is_showing === "true") {
        return knex("movies")
            .join(
                "movies_theaters",
                "movies.movie_id",
                "movies_theaters.movie_id"
            )
            .select("movies.*")
            .where({ is_showing: true });
    } else {
        return knex("movies").select("*");
    }
}

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function theatersShowing() {
    const { movieId } = req.params;

    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ movie_id: movieId });
}

async function reviewsForMovie() {
    const { movieId } = req.params;

    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
            "reviews.*",
            "critics.critic_id",
            "critics.surname",
            "critics.organization_name",
            "critics.created_at as critic_created_at",
            "critics.updated_at as critic_updated_at"
        )
        .where({ movie_id: movieId })
        .then((reviews) => reviews.map(nestCritic))
}

module.exports = {
    list,
    read,
    theatersShowing,
    reviewsForMovie,
};
