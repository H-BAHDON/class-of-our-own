const { sequelize, User, Cohort, Milestone } = require("../../models");
const { Op } = require("sequelize");

async function HandleCurrentMilestone(req, res) {
  try {
    const email = req.user.dataValues.email;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    if (user.role !== "trainee") {
      return res.status(422).json({ error: "User is not a trainee" });
    }

    const currentDate = new Date();

    // Find current milestone 
    const currentMilestone = await Milestone.findOne({
      where: {
        startDate: { [Op.lte]: currentDate },
        endDate: { [Op.gte]: currentDate },
      },
    });

    // Return milestone information
    if (currentMilestone) {
      return res.json({
        name: currentMilestone.dataValues.name,
        startDate: currentMilestone.dataValues.startDate,
        endDate: currentMilestone.dataValues.endDate,
      });
    } else {
      return res.json({ message: "No current milestone found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function HandleGetAllMillestones() {}

module.exports = { HandleCurrentMilestone, HandleGetAllMillestones };
