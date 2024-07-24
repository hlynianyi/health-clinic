// models/Doctor.js
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
  photo: { type: String },
  education: { type: String }, // Новое поле для образования
  schedule: { type: String }, // Новое поле для графика работы
  reviews: [
    {
      name: String,
      email: String,
      text: String,
      date: Date,
    },
  ],
  appointments: [
    {
      date: { type: Date, required: true }, // Обязательно тип Date
      time: { type: String, required: true }, // Время в формате строки
    },
  ],
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
