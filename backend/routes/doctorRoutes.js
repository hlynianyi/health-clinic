const express = require('express');
const { registerDoctor, getDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.post('/register', registerDoctor);
router.get('/', getDoctors);

module.exports = router;
