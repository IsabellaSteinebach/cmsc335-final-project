const mongoose = require("mongoose");

const dogEntrySchema = new mongoose.Schema({
  name: String,
  dogImageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DogEntry", dogEntrySchema);