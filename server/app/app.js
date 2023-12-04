const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./middleware/passport");
const CodewarsService = require("./helpers/CodewarsService");

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

// routes paths
const authRoutes = require("./routes/authRoutes");
const signpostRoute = require("./routes/signpostRoute");
const userRoutes = require("./routes/userRoute");
const milestoneRoute = require("./routes/milestone");
const CodewarsRoutes = require("./routes/codewarsRoutes");
const ReposRoutes = require("./routes/ReposRoutes");
const cohortsRoutes = require("./routes/cohortsRoutes");

app.use("/auth", authRoutes);
app.use("/signpost", signpostRoute);
app.use("/user", userRoutes);
app.use("/current-milestone", milestoneRoute);
app.use("/codewars", CodewarsRoutes);
app.use("/getAllRepos", ReposRoutes);
app.use("/cohorts", cohortsRoutes);

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
