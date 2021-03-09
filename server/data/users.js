/**
 * @description Sample file for user data
 * Password field in the user data will be hashed using bcryptjs library before saving to database
 */

const users = [
	{
		_id: 1,
		name: "User 1",
		email: "user1@example.com",
		password: "1234567",
	},
	{
		_id: 2,
		name: "User 2",
		email: "user2@example.com",
		password: "1234567",
	},
	{
		_id: 3,
		name: "User 3",
		email: "user3@example.com",
		password: "1234567",
	},
];

module.exports = users;
