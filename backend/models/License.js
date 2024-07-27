// models/License.js
const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("License", licenseSchema);
