class PullRequestServiec {
    static async getAllPullRequest(githubAccount) {
      try {
        const apiUrl = `https://www.codewars.com/api/v1/users/${username}`;
  
  
      } catch (error) {
        throw new Error(`Error fetching All pull Requests: ${error.message}`);
      }
    }
  }
  
  module.exports = PullRequestServiec;
