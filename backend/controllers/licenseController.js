// controllers/licenseController.js
const License = require("../models/License");
const fs = require("fs");
const path = require("path");

exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addLicense = async (req, res) => {
  const { title } = req.body;
  const imagePath = req.file.path;

  const newLicense = new License({
    title,
    imagePath,
  });

  try {
    const savedLicense = await newLicense.save();
    res.status(201).json(savedLicense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLicense = async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) return res.status(404).json({ message: "License not found" });

    // Удаление файла с сервера
    fs.unlink(path.join(__dirname, "../", license.imagePath), (err) => {
      if (err) console.error(err);
    });

    await License.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "License deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
