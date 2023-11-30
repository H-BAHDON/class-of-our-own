class PullRequestService {
  static async getAllPullRequest(githubAccount) {
    try {
      const apiUrl = `https://api.github.com/users/${githubAccount}/repos`;
      let filteredData;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          filteredData = data
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
        } else {
          console.error("Data format is not as expected.");
        }
        return filteredData;
      } else {
        throw new Error("Failed to fetch pull requests.");
      }
    } catch (error) {
      throw new Error(`Error fetching All pull Requests: ${error.message}`);
    }
  }
}

module.exports = PullRequestService;
