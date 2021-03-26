const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isChef: {
      type: Boolean,
      required: true,
      default: false,
    },
    stripeCustomer: {
      type: String,
      required: false,
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
    cuisines: {
      type: [String],
    cart: {
      chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChefProfile",
        required: true,
      },
      items: [
        {
          recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// check if entered password matches the current user's hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
