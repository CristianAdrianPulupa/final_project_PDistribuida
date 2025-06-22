const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  bio: String,
  image: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
