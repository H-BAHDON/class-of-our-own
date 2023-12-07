const { User } = require("../../models");
const ReposService = require("../helpers/ReposService");
const { Milestone, FactorExpectation, Factor } = require("../../models");
const { Op } = require("sequelize");


async function pullRequest(req, res) {
  try {
    const email = req.user.dataValues.email;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const githubAccount = user.traineeGithubAccount;
    const accessToken = user.accessToken;

    const allRepos = await ReposService.getAllRepos(githubAccount, accessToken);
    const clonedReposWithOwner = await ReposService.getAllReposWithOwner(
      allRepos
    );

    const repoDetailsPromises = clonedReposWithOwner.map((repo) =>
      ReposService.fetchRepositoryDetails(repo, accessToken)
    );

    const repoDetails = await Promise.all(repoDetailsPromises);

    const allCyfRepos = repoDetails.filter(
      (repo) =>
        repo &&
        repo.parent &&
        repo.parent.owner &&
        repo.parent.owner.login === "CodeYourFuture"
    );

    const mappedRepos = allCyfRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      fork: repo.fork,
      created_at: repo.created_at,
      owner: {
        login: repo.owner.login,
      },
    }));

    const pullRequestsPromises = mappedRepos.map((repo) =>
      ReposService.fetchPullRequests(repo.name, repo.owner.login, accessToken)
    );

    const pullRequestsData = await Promise.all(pullRequestsPromises);

    const pullRequestsInfo = pullRequestsData
      .map((pullRequests) => ({
        total_count: pullRequests ? pullRequests.total_count : 0,
        items: pullRequests
          ? pullRequests.items.map((item) => ({
              number: item.number,
              html_url: item.html_url,
              title: item.title,
              updated_at: item.updated_at,
            }))
          : [],
      }))
      .filter((info) => info.total_count > 0);

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
  
      const currentMilestone = await fetchCurrentMilestone();
  
      const PRsFactorExpectation = await FactorExpectation.findOne({
        where: {
          milestoneId: currentMilestone.id,
        },
        include: [
          {
            model: Factor,
            where: { name: "Pulls" },
            attributes: ["name"],
          },
        ],
      });
  
      // Extract the total count of pull requests
      const totalPulls = pullRequestsInfo.reduce((acc, info) => acc + info.total_count, 0);
  
      return res.status(200).json({
        pulls: totalPulls,
        factorName: "Pulls",
        factorExpectationValue: PRsFactorExpectation.dataValues.value,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error: "Failed to fetch information on the number of pull requests",
      });
    }
  }
async function getAllRepos(req, res) {
  try {
    const email = req.user.dataValues.email;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const githubAccount = user.traineeGithubAccount;
    const accessToken = user.accessToken;

    const allRepos = await ReposService.getAllRepos(githubAccount, accessToken);
    const clonedReposWithOwner = await ReposService.getAllReposWithOwner(
      allRepos
    );

    const repoDetailsPromises = clonedReposWithOwner.map((repo) =>
      ReposService.fetchRepositoryDetails(repo, accessToken)
    );

    const repoDetails = await Promise.all(repoDetailsPromises);

    const allCyfRepos = repoDetails.filter(
      (repo) =>
        repo &&
        repo.parent &&
        repo.parent.owner &&
        repo.parent.owner.login === "CodeYourFuture"
    );

    const mappedRepos = allCyfRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      fork: repo.fork,
      created_at: repo.created_at,
      owner: {
        login: repo.owner.login,
      },
    }));

    return res.status(200).json({ allPullRequest: mappedRepos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error:
        "Failed to fetch information on the number of cloned CYF repositories for trainees",
    });
  }
}

module.exports = { pullRequest, getAllRepos };
