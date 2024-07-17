const express = require("express");
const { registerDoctor, getDoctors, getDoctorPhoto } = require("../controllers/doctorController");

module.exports = (upload) => {
  const router = express.Router();

  router.post('/register', upload.single('photo'), registerDoctor);
  router.get('/', getDoctors);
  router.get('/photo/:filename', getDoctorPhoto); // Новый маршрут для получения фотографии

  return router;
};
