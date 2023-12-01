const https = require("https");
const fs = require("fs").promises;

class CodewarsService {
  static async getRank(username) {
    try {
      const apiUrl = `https://www.codewars.com/api/v1/users/${username}`;

      const response = await new Promise((resolve, reject) => {
        https
          .get(apiUrl, (res) => {
            let data = "";

            res.on("data", (chunk) => {
              data += chunk;
            });

            res.on("end", () => {
              resolve(JSON.parse(data));
            });
          })
          .on("error", (error) => {
            reject(error);
          });
      });

      return response;
    } catch (error) {
      throw new Error(`Error fetching Codewars rank: ${error.message}`);
    }
  }

  static async getCodewarsRank(req, res) {
    try {
      const { username } = req.params;
      const codewarsData = await CodewarsService.getRank(username);

      console.log("Codewars API Response:", codewarsData);

      const jsonFilePath = `./data/${username}_codewars_data.json`;
      await fs.writeFile(jsonFilePath, JSON.stringify(codewarsData));

      const {
        id,
        username: apiUsername,
        name,
        honor,
        clan,
        leaderboardPosition,
        skills,
        ranks,
        codeChallenges,
      } = codewarsData;

      const structuredResponse = {
        id,
        username: apiUsername,
        name,
        honor,
        clan,
        leaderboardPosition,
        skills,
        ranks,
        codeChallenges,
      };

      res.status(200).json(structuredResponse);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Codewars rank." });
    }
  }
}

module.exports = CodewarsService;
