const fetch = require("node-fetch")
class ReposService {
  static async getAllRepos(githubAccount, accessToken) {
    try {
      const apiUrl = `https://api.github.com/users/${githubAccount}/repos`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      let allRepos = [];
      let page = 1;
      let response;  
  
      do {
        response = await fetch(`${apiUrl}?page=${page}&per_page=100`, { headers });
  
        console.log('GitHub API Rate Limit Limit:', response.headers.get('X-RateLimit-Limit'));
        console.log('GitHub API Rate Limit Remaining:', response.headers.get('X-RateLimit-Remaining'));
        console.log('GitHub API Rate Limit Reset:', response.headers.get('X-RateLimit-Reset'));
  
        if (!response.ok) {
          console.error('GitHub API Error:', response.status, response.statusText);
          throw new Error(`GitHub API Error: ${response.status} - ${response.statusText}`);
        }
  
        const repos = await response.json();
        allRepos = allRepos.concat(repos);
  
        page++;
  
      } while (response.headers.get('Link') && response.headers.get('Link').includes('rel="next"'));
  
      return allRepos;
    } catch (error) {
      throw new Error(`Error fetching all repos: ${error.message}`);
    }
  }
  
  static async getAllReposWithOwner(cachedData) {
    try {
      if (!cachedData || !Array.isArray(cachedData)) {
        throw new Error("Invalid input for cachedData");
      }
  
      const filteredData = cachedData
        .filter((repo) => repo.owner && repo.owner.login) 
        .map(({ id, name, full_name, fork, created_at, owner }) => ({
          id,
          name,
          full_name,
          fork,
          created_at,
          owner: {
            login: owner.login,
          },
        }));
      return filteredData;
    } catch (error) {
      throw new Error(`Error for getting All cloned repos: ${error.message}`);
    }
  }

  static async fetchRepositoryDetails(repo, accessToken) {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo.full_name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error('GitHub API Error:', response.status, response.statusText);
        return null;
      }

      const repoDetails = await response.json();
      return repoDetails;
    } catch (error) {
      console.error('Error fetching repository details:', error.message);
      return null;
    }
  }

  static async fetchPullRequests(repo, author, accessToken) {
    try {
      const response = await fetch(`https://api.github.com/search/issues?q=is:pr+repo:CodeYourFuture/${repo}+author:${author}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        console.error('GitHub API Error:', response.status, response.statusText);
        return null;
      }
  
      const pullRequests = await response.json();
      return pullRequests;
    } catch (error) {
      console.error('Error fetching pull requests:', error.message);
      return null;
    }
  }
  
}

module.exports = ReposService;
