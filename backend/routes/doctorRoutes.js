const express = require("express");
const {
  registerDoctor,
  getDoctors,
} = require("../controllers/doctorController");

module.exports = (upload) => {
  const router = express.Router();

  router.post("/register", upload.single("photo"), registerDoctor);
  router.get("/", getDoctors);

  return router;
};
