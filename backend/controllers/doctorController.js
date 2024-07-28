const Doctor = require("../models/Doctor");

// GET
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

// CREATE
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

  try {
    const parsedSchedule = JSON.parse(schedule); // парсим строку JSON в объект
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
      schedule: parsedSchedule,
    });

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
  const { date, time, name, email, phone } = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = { date, time, name, email, phone };
    doctor.appointments.push(appointment);
    await doctor.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateDoctor = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    console.log("updatedData object schedule?:>> ", updatedData);
    // if (updatedData.schedule) {
    //   updatedData.schedule = JSON.parse(updatedData.schedule);
    // }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { name, email, text } = req.body;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const review = doctor.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.name = name || review.name;
    review.email = email || review.email;
    review.text = text || review.text;

    await doctor.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    console.log(`Deleting review ${reviewId} from doctor ${doctor}`);

    // Удаляем поддокумент отзыва
    const review = doctor.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    doctor.reviews.pull(reviewId); // Удаляем отзыв из массива

    await doctor.save(); // Сохраняем изменения в документе
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
