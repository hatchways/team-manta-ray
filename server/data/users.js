const bcrypt = require("bcryptjs");

/**
 * @description Sample file for user data
 * Password field in the user data will be hashed using bcryptjs library before saving to database
 */

const users = [
  {
    name: "User 1",
    email: "user1@example.com",
    password: bcrypt.hashSync("1234567", 10),
    isChef: true,
  },
  {
    name: "User 2",
    email: "user2@example.com",
    password: bcrypt.hashSync("1234567", 10),
  },
  {
    name: "User 3",
    email: "user3@example.com",
    password: bcrypt.hashSync("1234567", 10),
  },
];

module.exports = users;
