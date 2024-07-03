const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Username of the user making the donation
  date: { type: Date, default: Date.now },    // Date of the donation
  amount: { type: Number, required: true }    // Amount donated
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;