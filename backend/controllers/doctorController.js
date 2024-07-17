const Doctor = require('../models/Doctor');
const multer = require('multer');
const path = require('path');

// Настройка multer для хранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.registerDoctor = async (req, res) => {
  const { login, password, name, specialty, email, experience, about } = req.body;
  const photo = req.file ? req.file.path : '';

  try {
    const doctor = new Doctor({
      login,
      password,
      name,
      specialty,
      email,
      experience,
      about,
      photo
    });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(400).json({ message: 'Error registering doctor', error });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching doctors', error });
  }
};

exports.upload = upload;
