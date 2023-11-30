const { Op } = require("sequelize");
const { User, Milestone, FactorExpectation, Factor } = require("../../models");
const CodewarsService = require("../helpers/CodewarsService");
const { compareRanks } = require('../helpers/rankUtils');

const fetchCurrentMilestone = async () => {
  try {
    const currentDate = new Date();
    const currentMilestone = await Milestone.findOne({
      where: {
        startDate: { [Op.lte]: currentDate },
        endDate: { [Op.gte]: currentDate },
      },
    });
    return currentMilestone;
  } catch (error) {
    throw new Error("Error fetching current milestone: " + error.message);
  }
};

const fetchUserByCodewarsUsername = async (traineeCodewarsUsername) => {
  try {
    const user = await User.findOne({
      where: { traineeCodwarsUsername: traineeCodewarsUsername },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getUserRankAndFactor = async (req, res) => {
    try {
      const traineeCodewarsUsername = req.params.traineeCodewarsUsername;
  
      const user = await fetchUserByCodewarsUsername(traineeCodewarsUsername);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const codewarsData = await CodewarsService.getRank(traineeCodewarsUsername);
      const currentMilestone = await fetchCurrentMilestone(); 
  
      const codewarsFactorExpectation = await FactorExpectation.findOne({
        where: {
          milestoneId: currentMilestone.id,
        },
        include: [
          {
            model: Factor,
            where: { name: "Codewars" },
            attributes: ["name"],
          },
        ],
      });
  
      if (!codewarsFactorExpectation) {
        return res.status(404).json({
          error: "No factor expectation found for Codewars in the current milestone.",
          rank: codewarsData.ranks.overall.rank,
        });
      }
  
      const factorExpectationValue = `${codewarsFactorExpectation.value} kyu`;
  
      res.status(200).json({
        rank: codewarsData.ranks.overall.name,
        factorName: codewarsFactorExpectation.Factor.name,
        factorExpectationValue,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        error: "Failed to fetch Codewars data.",
      });
    }
  };
  

const getUserCodewarsData = async (req, res) => {
  try {
    const traineeCodewarsUsername = req.params.traineeCodewarsUsername;

    const user = await fetchUserByCodewarsUsername(traineeCodewarsUsername);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const codewarsData = await CodewarsService.getRank(traineeCodewarsUsername);
    const currentMilestone = await fetchCurrentMilestone(); 

    const codewarsFactorExpectation = await FactorExpectation.findOne({
      where: {
        milestoneId: currentMilestone.id,
      },
      include: [
        {
          model: Factor,
          where: { name: "Codewars" },
          attributes: ["name"],
        },
      ],
    });

    if (!codewarsFactorExpectation) {
      return res.status(404).json({
        error:
          "No factor expectation found for Codewars in the current milestone.",
        rank: codewarsData.ranks.overall.rank,
      });
    }

    const factorExpectationValue = `${codewarsFactorExpectation.value} kyu`;
    const rankComparison = compareRanks(codewarsData.ranks.overall.name, factorExpectationValue);

    const combinedData = {
      id: user.id,
      username: user.traineeCodewarsUsername,
      name: user.name,
      honor: codewarsData.honor,
      clan: codewarsData.clan,
      leaderboardPosition: codewarsData.leaderboardPosition,
      skills: codewarsData.skills,
      ranks: codewarsData.ranks,
      codeChallenges: codewarsData.codeChallenges,
      currentMilestone,
      factorName: codewarsFactorExpectation.Factor.name,
      factorExpectationValue,
      rankComparison,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to fetch Codewars data.",
    });
  }
};

module.exports = { getUserRankAndFactor, getUserCodewarsData };
