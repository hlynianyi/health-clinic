
const express = require("express");
const {
  getDoctors,
  getDoctorById,
  registerDoctor,
  addReview,
} = require("../controllers/doctorController");

module.exports = (upload) => {
  const router = express.Router();

  router.get("/", getDoctors);
  router.get("/:id", getDoctorById);
  router.post("/register", upload.single("photo"), registerDoctor);
  router.post("/:id/reviews", addReview);

  return router;
};
