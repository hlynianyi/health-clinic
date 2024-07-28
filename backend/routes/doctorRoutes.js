// const express = require("express");
// const {
//   getDoctors,
//   getDoctorById,
//   registerDoctor,
//   addReview,
//   addAppointment,
//   updateDoctor,
//   deleteDoctor,
//   deleteReview,
//   updateReview,
// } = require("../controllers/doctorController");

// module.exports = (upload) => {
//   const router = express.Router();

//   // GET
//   router.get("/", getDoctors);
//   router.get("/:id", getDoctorById);

//   // POST
//   router.post("/register", upload.single("photo"), registerDoctor);
//   router.post("/:id/reviews", addReview);
//   router.post("/:id/appointments", addAppointment);

//   // PUT
//   router.put("/:id", updateDoctor);
//   router.put("/:id/reviews/:reviewId", updateReview);

//   // DELETE
//   router.delete("/:id", deleteDoctor);
//   router.delete("/:id/reviews/:reviewId", deleteReview);

//   return router;
// };
const express = require("express");
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

  // PUT
  router.put("/:id", updateDoctor);
  router.put("/:id/reviews/:reviewId", updateReview);

  // DELETE
  router.delete("/:id", deleteDoctor);
  router.delete("/:id/reviews/:reviewId", deleteReview);

  return router;
};
