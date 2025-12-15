const express = require("express");
const router = express.Router();
const DogEntry = require("../models/DogEntry");

/* HOME */
router.get("/", (req, res) => {
  res.render("index");
});

/* FORM SUBMISSION */
router.post("/seeDog", async (req, res) => {
  const application = req.body;

  // Call Dog API
  const apiResponse = await fetch("https://dog.ceo/api/breeds/image/random");
  const dogData = await apiResponse.json();

  // Save API result to MongoDB
  await DogEntry.create({
    name: application.name,
    dogImageUrl: dogData.message
  });

  const completedAt = new Date().toString();

  res.render("seeDog", {
    application,
    completedAt,
    name: application.name,
    dogImage: dogData.message
  });
});

/* VIEW SAVED DOGS */
router.get("/dogs", async (req, res) => {
  const dogs = await DogEntry.find({}).sort({ createdAt: -1 });

  res.render("dogs", { dogs });
});

/* CLEAR DB */
router.post("/clearDogs", async (req, res) => {
  await DogEntry.deleteMany({});
  res.redirect("/dogs");
});

module.exports = router;
