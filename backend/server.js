const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const { MongoClient, GridFSBucket } = require("mongodb"); // Изменение здесь

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

let gfsBucket;
conn.once("open", () => {
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
  console.log("Connected to MongoDB");
});

// Create storage engine
const storage = multer.memoryStorage(); // Используем память для временного хранения файла

const upload = multer({ storage });

app.use((req, res, next) => {
  req.gfsBucket = gfsBucket; // Добавляем gfsBucket в запрос
  next();
});

app.use("/api/doctors", require("./routes/doctorRoutes")(upload)); // Изменение здесь
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { upload, gfsBucket };
