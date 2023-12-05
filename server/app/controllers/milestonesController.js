const { sequelize, User, Milestone, FactorExpectation, Factor, Cohort } = require("../../models");

async function getAllMilestones(req, res) {
  try {
    const email = req.user.dataValues.email;

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming user has a cohortId, change this according to your data model
    const cohortId = user.cohortId;

    // Get all milestones for the user's cohort
    const milestones = await Milestone.findAll({
      where: { cohortId: cohortId },
    });

    // Fetch factor expectations for each milestone
    const milestoneData = await Promise.all(milestones.map(async (milestone) => {
      const factorExpectations = await FactorExpectation.findAll({
        where: { milestoneId: milestone.id },
      });

      // Fetch factors for the factor expectations
      const factors = await Promise.all(factorExpectations.map(async (expectation) => {
        const factor = await Factor.findByPk(expectation.factorId);
        return { name: factor.name, value: expectation.value };
      }));

      return {
        id: milestone.id,
        milestone: milestone.name,
        startDate: milestone.startDate,
        factors: factors,
      };
    }));

    res.status(200).json(milestoneData);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch All milestones" });
  }
}

module.exports = { getAllMilestones };
