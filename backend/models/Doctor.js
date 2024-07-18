const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  about: { type: String },
  photo: { type: String }, // Поле для хранения пути к фото
});

// Хеширование пароля перед сохранением
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Doctor", doctorSchema);
