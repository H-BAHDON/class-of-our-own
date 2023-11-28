class CodewarsService {
  static async getRank(traineeCodewarsUsername) {
    try {
      const apiUrl = `https://www.codewars.com/api/v1/users/${traineeCodewarsUsername}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const rank = data.ranks.overall.name;
        return rank;
      } else {
        throw new Error("Failed to fetch Codewars rank.");
      }
    } catch (error) {
      throw new Error("Error fetching Codewars rank: " + error.message);
    }
  }
}

module.exports = CodewarsService;
