// routes/licenseRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getLicenses,
  addLicense,
  deleteLicense,
} = require("../controllers/licenseController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/licenses/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Получить все лицензии
router.get("/", getLicenses);

// Загрузить новую лицензию
router.post("/upload", upload.single("license"), addLicense);

// Удалить лицензию
router.delete("/:id", deleteLicense);

module.exports = router;
