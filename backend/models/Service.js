const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  services: [
    {
      type: [String, String], // [0]: service name, [1]: price
      required: true,
    },
  ],
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
