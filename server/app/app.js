const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./middleware/passport");
const CodewarsService = require("./CodewarsService");
dotenv.config();
const { Op } = require("sequelize");

const {
  sequelize,
  User,
  Cohort,
  Milestone,
  FactorExpectation,
  Factor,
} = require("../models");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "Pipper",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  })
);

passwordSetup(passport);

app.get("/", (req, res) => {
  res.send("testing");
});

app.get("/getRankAndFactorExpectation/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const user = await User.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const traineeCodewarsUsername = user.traineeCodwarsUsername;
    const rank = await CodewarsService.getRank(traineeCodewarsUsername);
    const currentDate = new Date();
    const currentMilestone = await Milestone.findOne({
      where: {
        startDate: { [Op.lte]: currentDate },
        endDate: { [Op.gte]: currentDate },
      },
    });
    if (!currentMilestone) {
      return res.status(404).json({ error: "No current milestone found." });
    }
    const codewarsFactorExpectation = await FactorExpectation.findOne({
      where: {
        milestoneId: currentMilestone.id,
      },
      include: [
        {
          model: Factor,
          where: { name: "Codewars" },
          attributes: ["name"],
        },
      ],
    });
    if (!codewarsFactorExpectation) {
      return res.status(404).json({
        error:
          "No factor expectation found for Codewars in the current milestone.",
        rank,
      });
    }
    res.status(200).json({
      rank,
      factorName: codewarsFactorExpectation.Factor.name,
      factorExpectationValue: `${codewarsFactorExpectation.value} kyu`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to fetch Codewars rank and factor expectation.",
    });
  }
});

// routes paths
const authRoutes = require("./routes/authRoutes");
const signpostRoute = require("./routes/signpostRoute");
const userRoutes = require("./routes/userRoute");
const milestoneRoute = require("./routes/milestone");

app.use("/auth", authRoutes);
app.use("/signpost", signpostRoute);
app.use("/user", userRoutes);
app.use("/current-milestone", milestoneRoute);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Listening on port ${port}`);
});
