const mapProperties = require("../utils/map-properties");

const nestCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  critic_created_at: "critic.created_at",
  critic_updated_at: "critic.updated_at",
});

module.exports = nestCritic;