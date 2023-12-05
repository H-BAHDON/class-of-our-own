const {
  sequelize,
  User,
  Milestone,
  FactorExpectation,
  Factor,
  Cohort,
} = require("../../models");

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

    res.status(200).json(milestoneData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch All milestones" });
  }
}

module.exports = { getAllMilestones };
