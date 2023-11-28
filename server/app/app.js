const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./middleware/passport");
const { sequelize, User } = require("../models");
const CodewarsService = require("./CodewarsService");

dotenv.config();

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

app.get("/getRank/:traineeCodewarsUsername", async (req, res) => {
  const traineeCodewarsUsername = req.params.traineeCodewarsUsername;

  try {
    const user = await User.findOne({
      where: { traineeCodwarsUsername: traineeCodewarsUsername },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const rank = await CodewarsService.getRank(traineeCodewarsUsername);

    res.status(200).json({ rank });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch Codewars rank." });
  }
});

// routes paths
const authRoutes = require("./routes/authRoutes");
const signpostRoute = require("./routes/signpostRoute");
const userRoutes = require("./routes/userRoute");

app.use("/auth", authRoutes);
app.use("/signpost", signpostRoute);
app.use("/user", userRoutes);

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
