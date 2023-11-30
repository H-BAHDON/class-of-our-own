// Function to compare ranks
const compareRanks = (userRank, expectedRankName) => {
    const numericUserRank = convertRankToNumeric(userRank);
    const numericExpectedRank = convertRankToNumeric(expectedRankName);
  
    if (numericUserRank < numericExpectedRank) {
      return "User exceeds expectations";
    } else if (numericUserRank === numericExpectedRank) {
      return "User meets expectations";
    } else {
      return "User is below expectations";
    }
  };
  
  // Function to convert rank to a numerical value
  const convertRankToNumeric = (rank) => {
    if (typeof rank !== 'string') {
      return 0;
    }
    return parseInt(rank.split(" ")[0]);
  };
  
  module.exports = { compareRanks, convertRankToNumeric };
  