const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./middleware/passport");
const { sequelize, User, Cohort, Milestone } = require("../models");

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

// routes paths
const authRoutes = require("./routes/authRoutes");
const signpostRoute = require("./routes/signpostRoute");
const userRoutes = require("./routes/userRoute");

app.use("/auth", authRoutes);
app.use("/signpost", signpostRoute);
app.use("/user", userRoutes);

app.get("/current-milestone", async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    if (user.role !== "trainee") {
      return res.status(422).json({ error: "User is not a trainee" });
    }

    const currentDate = new Date();

    const currentMilestone = await Milestone.findOne({
      where: {
        cohortId: user.cohortId,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      },
    });

    // Return milestone information
    if (currentMilestone) {
      return res.json({
        milestoneName: currentMilestone.name,
        startDate: currentMilestone.startDate,
        endDate: currentMilestone.endDate,
      });
    } else {
      return res.json({ message: "No current milestone found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

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
