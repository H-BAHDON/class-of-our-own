const { User } = require("../../models");

async function handleSignpost(req, res) {
  try {
    const { codeWarsUsername, codilityUsername, cohortId } = req.body;
    if (!codeWarsUsername) {
      return res.status(400).json({
        error: " CodeWars and Codility usernames and cohort are required.",
      });
    }

    const [numOfRows, updatedRows] = await User.update(
      {
        traineeCodwarsUsername: codeWarsUsername,
        traineeCodilityUsername: codilityUsername,
        cohortId: cohortId,
      },
      { where: { email: req.user.email } }
    );

    if (numOfRows === 0) {
      return res
        .status(404)
        .json({ error: "User not found for the authenticated user." });
    }

    const updatedUser = await User.findOne({
      where: { email: req.user.email },
    });
    return res
      .status(200)
      .json({ message: "Usernames saved successfully.", user: updatedUser });
  } catch (err) {
    console.error("Error saving usernames:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { handleSignpost };
