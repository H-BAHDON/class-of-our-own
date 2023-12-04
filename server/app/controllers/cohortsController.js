const { sequelize, Cohort } = require("../../models");

async function getAllCohorts(req, res) {
  try {
    const getCohorts = await Cohort.findAll();
    return res.status(200).json({ getCohorts });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAllCohorts };
