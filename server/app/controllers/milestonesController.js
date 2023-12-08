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

    // Using findOne with include to fetch user along with cohort information
    const user = await User.findOne({
      where: { email: email },
      include: {
        model: Cohort,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cohortId = user.Cohort.id;

    // Using findAll with include to fetch milestones along with their factor expectations and factors
    const milestones = await Milestone.findAll({
      where: { cohortId: cohortId },
      include: {
        model: FactorExpectation,
        include: Factor,
      },
    });

    // Mapping milestones to the desired format
    const milestoneData = milestones.map((milestone) => ({
      id: milestone.id,
      milestone: milestone.name,
      startDate: milestone.startDate,
      factors: milestone.FactorExpectations.map((expectation) => ({
        name: expectation.Factor.name,
        value: expectation.value,
      })),
    }));

    res.status(200).json(milestoneData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch All milestones" });
  }
}

module.exports = { getAllMilestones };
