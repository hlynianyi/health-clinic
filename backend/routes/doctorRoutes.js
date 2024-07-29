const express = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");
const {
  getDoctors,
  getDoctorById,
  registerDoctor,
  addReview,
  addAppointment,
  updateDoctor,
  deleteDoctor,
  deleteReview,
  updateReview,
} = require("../controllers/doctorController");

module.exports = (upload) => {
  const router = express.Router();

  // GET
  router.get("/", getDoctors);
  router.get("/:id", getDoctorById);

  // POST
  router.post("/register", upload.single("photo"), registerDoctor);
  router.post("/:id/reviews", addReview);
  router.post("/:id/appointments", addAppointment);
  router.post("/login", async (req, res) => {
    const { login, password } = req.body;

    try {
      const doctor = await Doctor.findOne({ login });
      if (!doctor) {
        return res
          .status(404)
          .json({ success: false, message: "Доктор не найден" });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Неверный пароль" });
      }

      res.json({ success: true, doctor });
    } catch (error) {
      console.error("Ошибка при проверке логина:", error);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  });

  // PUT
  router.put("/:id", upload.single("photo"), updateDoctor);
  router.put("/:id/reviews/:reviewId", updateReview);

  // DELETE
  router.delete("/:id", deleteDoctor);
  router.delete("/:id/reviews/:reviewId", deleteReview);

  return router;
};

// module.exports = (upload) => {
//   const router = express.Router();

//   // GET
//   router.get("/", getDoctors);
//   router.get("/:id", getDoctorById);

//   // POST
//   router.post("/register", upload.single("photo"), registerDoctor);
//   router.post("/:id/reviews", addReview);
//   router.post("/:id/appointments", addAppointment);

//   router.post("/login", async (req, res) => {
//     const { login, password } = req.body;

//     try {
//       const doctor = await Doctor.findOne({ login });
//       if (!doctor) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Доктор не найден" });
//       }

//       const isMatch = await bcrypt.compare(password, doctor.password);
//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Неверный пароль" });
//       }

//       res.json({ success: true, doctor });
//     } catch (error) {
//       console.error("Ошибка при проверке логина:", error);
//       res.status(500).json({ success: false, message: "Ошибка сервера" });
//     }
//   });

//   // PUT
//   router.put("/:id", updateDoctor);
//   router.put("/:id/reviews/:reviewId", updateReview);

//   // DELETE
//   router.delete("/:id", deleteDoctor);
//   router.delete("/:id/reviews/:reviewId", deleteReview);

//   return router;
// };
