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

    // Если был загружен файл, добавляем путь к фото
    if (req.file) {
      updatedData.photo = req.file.path;
    }

    // Проверяем, есть ли поле schedule и десериализуем его, если это строка
    if (typeof updatedData.schedule === "string") {
      try {
        updatedData.schedule = JSON.parse(updatedData.schedule);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Некорректный формат расписания" });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!doctor) {
      return res.status(404).json({ message: "Доктор не найден" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Ошибка при обновлении данных доктора:", error);
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
exports.updateAppointment = async (req, res) => {
  const { id, appointmentId } = req.params;
  const updatedAppointment = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Доктор не найден" });
    }

    const appointmentIndex = doctor.appointments.findIndex(
      (appt) => appt._id.toString() === appointmentId
    );
    if (appointmentIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Запись не найдена" });
    }

    doctor.appointments[appointmentIndex] = {
      ...doctor.appointments[appointmentIndex].toObject(),
      ...updatedAppointment,
    };
    await doctor.save();

    res.json({
      success: true,
      message: "Запись обновлена",
      appointments: doctor.appointments,
    });
  } catch (error) {
    console.error("Ошибка при обновлении записи:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  const { id, appointmentId } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Доктор не найден" });
    }

    doctor.appointments = doctor.appointments.filter(
      (appt) => appt._id.toString() !== appointmentId
    );
    await doctor.save();

    res.json({
      success: true,
      message: "Запись удалена",
      appointments: doctor.appointments,
    });
  } catch (error) {
    console.error("Ошибка при удалении записи:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

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
