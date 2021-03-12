const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chefProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  bio: String,
  profilePictureUrl: {
    type: String,
  },
  cuisineTags: {
    type: [String],
  },
});

const ChefProfile = mongoose.model("ChefProfile", chefProfileSchema);

module.exports = ChefProfile;
