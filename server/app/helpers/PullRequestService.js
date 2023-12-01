class PullRequestService {
  static async getAllPullRequest(githubAccount) {
    try {
      
      const apiUrl = `https://api.github.com/users/${githubAccount}/repos`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch pull requests.");
      }
    } catch (error) {
      throw new Error(`Error fetching All pull Requests: ${error.message}`);
    }
  }

  static async getAllPullRequestWithClone(getAllPRs) {
    try {
      const getAllPullRequest = getAllPRs;
      const filteredData = getAllPullRequest
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
      throw new Error(
        `Error fetching All cloned pull Requests: ${error.message}`
      );
    }
  }

  static async getAllPullRequestForCYF(getAllClonePRs) {
    let CYFRepos;
    try {
      const getAllPullRequest = getAllClonePRs;
      CYFRepos = getAllPullRequest.filter(async (repo) => {
        const apiUrl = `https://api.github.com/repos/${repo.full_name}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.parent.full_name.includes("CodeYourFuture")) {
            return repo;
          }
          return data;
        } else {
          throw new Error(
            "Failed to fetch pull requests for getting parent details"
          );
        }
      });
      return CYFRepos;
    } catch (error) {
      throw new Error(
        `Error fetching All pull Requests for CYF: ${error.message}`
      );
    }
  }
}

module.exports = PullRequestService;
