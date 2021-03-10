const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	pictureUrl: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
	},
	requiredStuff: {
		type: [String],
	},
	portionDescription: {
		type: String,
		required: true,
	},
	cuisineTags: {
		type: [String],
		required: true,
	},
});

const profileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	bio: String,
	favCuisines: {
		type: [String],
		required: true,
	},
	profilePictureUrl: {
		type: String,
		required: true,
	},
	recipes: [recipeSchema],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
