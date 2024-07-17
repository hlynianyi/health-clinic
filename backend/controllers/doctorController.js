const Doctor = require("../models/Doctor");
const { ObjectId } = require("mongodb"); // Изменение здесь

exports.registerDoctor = async (req, res) => {
  const { login, password, name, specialty, email, experience, about } =
    req.body;

  let photo = "";
  if (req.file && req.gfsBucket) {
    // Используем req.gfsBucket вместо gfs
    const filename = new ObjectId().toString();
    const uploadStream = req.gfsBucket.openUploadStreamWithId(
      filename,
      req.file.originalname,
      {
        contentType: req.file.mimetype,
      }
    );

    uploadStream.end(req.file.buffer); // Записываем файл в GridFS
    uploadStream.on("finish", () => {
      photo = filename; // Получаем имя файла из GridFS

      // Сохранение данных врача после завершения записи файла
      saveDoctorData(res, {
        login,
        password,
        name,
        specialty,
        email,
        experience,
        about,
        photo,
      });
    });
  } else {
    // Сохранение данных врача без фото
    saveDoctorData(res, {
      login,
      password,
      name,
      specialty,
      email,
      experience,
      about,
      photo,
    });
  }
};

const saveDoctorData = async (res, doctorData) => {
  try {
    const doctor = new Doctor(doctorData);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(400).json({ message: "Error registering doctor", error });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ message: "Error fetching doctors", error });
  }
};

exports.getDoctorPhoto = async (req, res) => {
  const { filename } = req.params;
  const { gfsBucket } = req;

  try {
    const files = await gfsBucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No file found" });
    }

    gfsBucket.openDownloadStreamByName(filename).pipe(res);
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(400).json({ message: "Error fetching photo", error });
  }
};
