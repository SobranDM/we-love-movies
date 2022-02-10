const service = require("./theaters.service");

async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

module.exports = {
  list
}