const dotenv = require("dotenv");
const users = require("./data/users.js");

const User = require("./models/userModel.js");
const Recipe = require("./models/recipeModel.js");

const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    console.log("Data imported!");
    process.exit();
  } catch (err) {
    console.log("Error in importing!", err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Recipe.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.log("Error in destroying!", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
