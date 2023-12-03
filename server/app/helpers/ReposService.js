class ReposService {
  static async getAllRepos(githubAccount) {
    try {
      const apiUrl = `https://api.github.com/users/${githubAccount}/repos`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch repos.");
      }
    } catch (error) {
      throw new Error(`Error fetching for getting All repos: ${error.message}`);
    }
  }

  static async getAllReposWithClone(getAllRepos) {
    try {
      const filteredData = getAllRepos
        //Check fork = true for repos
        .filter((repo) => repo.fork)
        // Get necessary properties
        .map(({ id, name, full_name, fork, created_at }) => ({
          id,
          name,
          full_name,
          fork,
          created_at,
        }));
      return filteredData;
    } catch (error) {
      throw new Error(`Error for getting All cloned repos: ${error.message}`);
    }
  }

  static async getAllReposForCYF(getAllCloneRepos) {
    let CYFRepos;
    try {
      const getAllPullRequest = getAllCloneRepos;
      CYFRepos = getAllPullRequest.filter(async (repo) => {
        const apiUrl = `https://api.github.com/repos/${repo.full_name}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.parent.full_name.includes("CodeYourFuture")) {
            return repo;
          }
          return null;
        } else {
          throw new Error("Failed to fetch repos for getting parent details");
        }
      });
      return CYFRepos;
    } catch (error) {
      throw new Error(
        `Error fetching for getting All repos for CYF: ${error.message}`
      );
    }
  }

  static async getTrainneReposNumber(getAllReposForCYF) {
    try {
      const ReposNumber = getAllReposForCYF.length;
      return ReposNumber;
    } catch (error) {
      throw new Error(
        `Error for getting numaber of CYF's repos: ${error.message}`
      );
    }
  }
}

module.exports = ReposService;
