const mapProperties = require("../utils/map-properties");

const nestCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

module.exports = nestCritic;