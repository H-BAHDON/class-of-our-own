const { sequelize, User} = require("../../models");
const ReposService = require("../helpers/ReposService");

async function handleRepos(req, res) {
    try {
        const email = req.user.dataValues.email;
        const accessToken = req.user.accessToken;

        const user = await User.findOne({
          where: { email: email },
        });
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const getAllRepos = await ReposService.getAllRepos(user.traineeGithubAccount, accessToken);
        console.log("getAllRepos:", getAllRepos);
        const getAllReposwithClone = await ReposService.getAllReposWithClone(
          getAllRepos
        );
        const getAllReposForCYF = await ReposService.getAllReposForCYF(
          getAllReposwithClone
        );
        const getTrainneReposNumber = await ReposService.getTrainneReposNumber(
          getAllReposForCYF
        );
        res.status(200).json(getTrainneReposNumber);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: " Failed to fetch information on the number of cloned CYF repositories for trainees" });
      }
}


module.exports = { handleRepos };
