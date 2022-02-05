if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// Router files
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

// App.use Route Handlers
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// App.use Routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;