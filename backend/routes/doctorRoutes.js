const express = require('express');
const { registerDoctor, getDoctors, upload } = require('../controllers/doctorController');
const router = express.Router();

router.post('/register', upload.single('photo'), registerDoctor);
router.get('/', getDoctors);

module.exports = router;
