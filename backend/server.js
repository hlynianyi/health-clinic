// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const doctorRoutes = require("./routes/doctorRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");
// const userRoutes = require("./routes/userRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const licenseRoutes = require("./routes/licenseRoutes");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/doctors", doctorRoutes(upload));
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/licenses", licenseRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const licenseRoutes = require("./routes/licenseRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Настройка multer для фотографий врачей
const doctorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/doctors/"); // Сохраняем фотографии врачей в папке uploads/doctors
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const doctorUpload = multer({ storage: doctorStorage });

// Настройка multer для лицензий
const licenseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/licenses/"); // Сохраняем лицензии в папке uploads/licenses
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const licenseUpload = multer({ storage: licenseStorage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/licenses", licenseRoutes(licenseUpload));
app.use("/api/doctors", doctorRoutes(doctorUpload));
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
