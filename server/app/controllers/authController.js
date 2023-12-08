// controllers/authController.js

const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../../models");

const secretKey = "melly";

function GitHubAuthentication(req, res, next) {
  passport.authenticate("github", {
    scope: ["user:email", "repo", "repo:status", "user", "project"],
  })(req, res, next);
}

async function handleGitHubCallback(req, res) {
  try {
    const { id, name, email, traineeGithubAccount } = req.user.dataValues;
    const { githubData } = req.authInfo;

    const user = { id, name, email, traineeGithubAccount, ...githubData };
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1hr" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 25 * 60 * 60 * 1000,
      secure: true,
    });

    setTimeout(async () => {
      const updatedUser = await User.findOne({ where: { email } });

      if (
        updatedUser &&
        (updatedUser.traineeCodwarsUsername !== null ||
          updatedUser.traineeCodilityUsername !== null)
      ) {
        res.redirect(`${process.env.CLIENT_URL}`);
      } else {
        res.redirect(`${process.env.CLIENT_URL}/PostSignup`);
      }
    }, 1000);
  } catch (err) {
    console.error("Error handling GitHub callback:", err);
    res.redirect("/");
  }
}

module.exports = { handleGitHubCallback, GitHubAuthentication };
