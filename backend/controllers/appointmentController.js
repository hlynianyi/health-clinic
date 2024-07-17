const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  const { doctorId, userId, date } = req.body;
  try {
    const appointment = new Appointment({ doctorId, userId, date });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error });
  }
};
