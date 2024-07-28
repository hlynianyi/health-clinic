const express = require("express");
const {
  getLicenses,
  addLicense,
  deleteLicense,
} = require("../controllers/licenseController");

module.exports = (upload) => {
  const router = express.Router();

  router.get("/", getLicenses);
  router.post("/upload", upload.single("license"), addLicense); // Используем другой upload для лицензий
  router.delete("/:id", deleteLicense);

  return router;
};
