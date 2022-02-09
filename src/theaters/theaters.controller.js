const service = require("./theaters.service");

function list(req, res) {
  res.sendStatus(200);
}

module.exports = {
  list
}