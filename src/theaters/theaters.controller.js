const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(req, res) {
  res.sendStatus(200);
}

module.exports = {
  list
}