const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
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
  favCuisines: {
    type: [String],
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  cuisineTags: {
    type: [String],
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
