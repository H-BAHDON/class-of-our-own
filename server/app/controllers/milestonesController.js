const { sequelize, Milestone, FactorExpectation } = require("../../models");

async function getAllMilestones(req, res) {
  try {
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: " Failed to fetch All milestones" });
  }
}

module.exports = { getAllMilestones };
