const knex = require("../db/connection");
const nestCritic = require("../utils/nestCritic");

// Middleware functions
async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: `Movie cannot be found with id ${movieId}.`,
    });
}

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

    let reviews = await knex("reviews")
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
    reviews.forEach((review) => nestCritic(review));
    return reviews;
}

module.exports = {
    list,
    read,
    movieExists,
    theatersShowing,
    reviewsForMovie,
};
