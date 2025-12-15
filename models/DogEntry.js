const mongoose = require("mongoose");

const dogEntrySchema = new mongoose.Schema({
  name: String,
  dogImageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// collection name becomes dogentries (it lowercases and pluralizes it)
module.exports = mongoose.model("DogEntry", dogEntrySchema); 