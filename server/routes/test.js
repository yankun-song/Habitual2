const express = require("express");
const dbController = require("../controllers/dbController");
const userController = require("../controllers/userController");

const router = express.Router();

// adding a new user ROUTE HANDLER
router.post("/login", (req, res) => {
  return res.status(200).json({ userId: 1, username: "BigCat" });
});

router.post("/feed", (req, res) => {
  return res.status(200).json({
    calendar: Array(42).fill(0),
    todaysHabits: [
      { habitName: "drink water", targetNum: 5, fullfilledPercent: 0.4 }, // each element is an object
      { habitName: "walk dog", targetNum: 1, fullfilledPercent: 1 },
      { habitName: "walk cat", targetNum: 6, fullfilledPercent: 0.5 },
    ],
  });
});

module.exports = router;
