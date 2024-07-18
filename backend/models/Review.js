const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
