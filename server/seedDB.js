const dotenv = require("dotenv");
const users = require("./data/users.js");

const User = require("./models/userModel.js");

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

importData();
