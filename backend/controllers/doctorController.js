// controllers/doctorController.js
const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerDoctor = async (req, res) => {
  const {
    login,
    password,
    name,
    specialty,
    email,
    experience,
    about,
    education,
    schedule,
  } = req.body;
  const photo = req.file ? req.file.path : "";

  const doctor = new Doctor({
    login,
    password,
    name,
    specialty,
    email,
    experience,
    about,
    photo,
    education,
    schedule,
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { name, email, text } = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const review = { name, email, text, date: new Date() };
    doctor.reviews.push(review);
    await doctor.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ message: "Date and time are required." });
  }

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = { date, time };
    doctor.appointments.push(appointment);
    await doctor.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ message: error.message });
  }
};
