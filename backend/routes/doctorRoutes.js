const express = require("express");
const {
  registerDoctor,
  getDoctors,
  getDoctorById
} = require("../controllers/doctorController");

module.exports = (upload) => {
  const router = express.Router();

  router.post("/register", upload.single("photo"), registerDoctor);
  router.get("/:id", getDoctorById);
  router.get("/", getDoctors);

  return router;
};
