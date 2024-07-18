const Doctor = require("../models/Doctor");

exports.registerDoctor = async (req, res) => {
  const { login, password, name, specialty, email, experience, about } =
    req.body;

  let photo = "";
  if (req.file) {
    photo = req.file.path; // Сохранение пути к файлу
  }

  try {
    const doctor = new Doctor({
      login,
      password,
      name,
      specialty,
      email,
      experience,
      about,
      photo,
    });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(400).json({ message: "Error registering doctor", error });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ message: "Error fetching doctors", error });
  }
};
