const mongoose = require('mongoose');

const volunteeringSchema = new mongoose.Schema({
  username: { type: String, required: true },    // Username of the user volunteering
  date: { type: Date, default: Date.now },       // Date of the volunteering activity
  activity: { type: String, required: true }     // Description of the volunteering activity
});

const Volunteering = mongoose.model('Volunteering', volunteeringSchema);

module.exports = Volunteering;