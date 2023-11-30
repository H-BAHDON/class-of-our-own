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
  
}

module.exports = PullRequestService;
