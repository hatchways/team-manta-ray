const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
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
