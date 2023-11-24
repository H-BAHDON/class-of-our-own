const { sequelize, User, Cohort, Milestone } = require("../../models");

async function HandleCurrentMilestone(req, res) {
  try {
    // console.log(req.user)
    // const email = req.user.dataValues.email;

    // const user = await User.findOne({
    //   where: { email },
    // });

    // if (!user) {
    //   return res.status(401).json({ error: "User is not authenticated" });
    // }

    // if (user.role !== "trainee") {
    //   return res.status(422).json({ error: "User is not a trainee" });
    // }

    // const currentDate = new Date();

    // const currentMilestone = await Milestone.findOne({
    //   where: {
    //     cohortId: user.cohortId,
    //     startDate: { $lte: currentDate },
    //     endDate: { $gte: currentDate },
    //   },
    // });

    // Return milestone information
    // if (currentMilestone) {
    //   return res.json({
    //     milestoneName: currentMilestone.name,
    //     startDate: currentMilestone.startDate,
    //     endDate: currentMilestone.endDate,
    //   });
    // } else {
    //   return res.json({ message: "No current milestone found" });

    res.json({
      name: "html-css",
      startDate: "2022-07-13 00:00:00+00",
      endDate: "2022-08-19 00:00:00+00 ",
    });

    // res.json(currentMilestone)
    //   // Return milestone information
    // if (currentMilestone) {
    //   return res.json({currentMilestone});
    // } else {
    //   return res.json({ message: "No current milestone found" });
    // }

    // res.json(req.user)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function HandleGetAllMillestones() {}

module.exports = { HandleCurrentMilestone, HandleGetAllMillestones };
