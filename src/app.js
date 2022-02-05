if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// Router files
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

// App.use Route Handlers


// App.use Routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;