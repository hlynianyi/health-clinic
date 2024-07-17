const Doctor = require("../models/Doctor");

exports.registerDoctor = async (req, res) => {
  const { name, specialty, email } = req.body;
  try {
    const doctor = new Doctor({ name, specialty, email });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
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
