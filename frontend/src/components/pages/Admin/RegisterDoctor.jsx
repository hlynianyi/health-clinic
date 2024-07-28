import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors(); // Повторный вызов для обновления списка
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor({
      ...doctor,
      startHour: doctor.schedule?.hours[0] || 8,
      endHour: doctor.schedule?.hours[1] || 16,
      days: doctor.schedule?.days || [],
    });
    setOpenEdit(true);
  };

  const handleManageReviews = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenReviews(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedDoctor(null);
  };

  const handleCloseReviews = () => {
    setOpenReviews(false);
    setSelectedDoctor(null);
    setSelectedReview(null);
  };

  const handleSaveDoctor = async () => {
    try {
      const { days, startHour, endHour, ...rest } = selectedDoctor;
      const updatedDoctor = {
        ...rest,
        schedule: {
          days,
          hours: [startHour, endHour],
        },
      };
      await axios.put(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}`,
        updatedDoctor
      );
      fetchDoctors();
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDoctor({ ...selectedDoctor, [name]: value });
  };

  const toggleDaySelection = (day) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      days: prevDoctor?.days?.includes(day)
        ? prevDoctor.days.filter((d) => d !== day)
        : [...(prevDoctor.days || []), day],
    }));
  };

  const handleReviewInputChange = (e, reviewId) => {
    const { name, value } = e.target;
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      reviews: prevDoctor.reviews.map((review) =>
        review._id === reviewId ? { ...review, [name]: value } : review
      ),
    }));
  };

  const handleSaveReview = async (reviewId) => {
    try {
      const review = selectedDoctor.reviews.find((r) => r._id === reviewId);
      await axios.put(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}/reviews/${reviewId}`,
        { ...review }
      );
      setSelectedReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}/reviews/${reviewId}`
      );
      setSelectedDoctor((prevDoctor) => ({
        ...prevDoctor,
        reviews: prevDoctor.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления докторами
      </h2>
      <ul className="mt-8 flex flex-col gap-2">
        {doctors.map((doctor) => (
          <li
            key={doctor._id}
            className="flex justify-between py-1 border-b-[1px] border-b-mainblue"
          >
            <span className="font-semibold flex flex-col justify-center">
              {doctor.name}
            </span>
            <div className="flex gap-3">
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleEdit(doctor)}
              >
                Редактировать
              </Button>
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleManageReviews(doctor)}
              >
                Управлять отзывами
              </Button>
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleDelete(doctor._id)}
              >
                Удалить
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Редактировать Доктора</DialogTitle>
        <DialogContent>
          <div className="flex flex-col my-4">
            <TextField
              required
              id="login"
              label="Логин:"
              name="login"
              value={selectedDoctor?.login || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="password"
              label="Пароль:"
              type="password"
              name="password"
              value={selectedDoctor?.password || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="email"
              label="Email:"
              type="email"
              name="email"
              value={selectedDoctor?.email || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="name"
              label="Ф.И.О:"
              name="name"
              value={selectedDoctor?.name || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              variant="filled"
            />
            <TextField
              required
              id="specialty"
              label="Специальность:"
              name="specialty"
              value={selectedDoctor?.specialty || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              variant="filled"
            />
            <TextField
              id="experience"
              label="Опыт работы:"
              type="number"
              name="experience"
              value={selectedDoctor?.experience || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
            <TextField
              id="education"
              label="Образование:"
              name="education"
              value={selectedDoctor?.education || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              variant="filled"
            />
            <textarea
              id="about"
              placeholder="О специалисте:"
              name="about"
              value={selectedDoctor?.about || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                marginBottom: "16px",
              }}
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Дни работы:
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDaySelection(day)}
                    className={`text-white py-1 px-2 rounded ${
                      selectedDoctor?.days?.includes(day)
                        ? "bg-mainblue text-white"
                        : "bg-bgdarkgray"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Часы работы:
              </label>
              <div className="flex gap-4">
                <TextField
                  required
                  id="startHour"
                  label="От"
                  type="number"
                  value={selectedDoctor?.startHour || 8}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      startHour: parseInt(e.target.value),
                    })
                  }
                  InputProps={{ inputProps: { min: 0, max: 23 } }}
                  sx={{ mb: 2, width: "100px" }}
                />
                <TextField
                  required
                  id="endHour"
                  label="До"
                  type="number"
                  value={selectedDoctor?.endHour || 16}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      endHour: parseInt(e.target.value),
                    })
                  }
                  InputProps={{ inputProps: { min: 0, max: 23 } }}
                  sx={{ mb: 2, width: "100px" }}
                />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  photo: e.target.files[0],
                })
              }
              style={{ marginTop: "1rem" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSaveDoctor} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openReviews}
        onClose={handleCloseReviews}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Управление отзывами{" "}
          {selectedDoctor ? <>{selectedDoctor.name}</> : <>Не выбран доктор</>}
        </DialogTitle>
        <DialogContent>
          {selectedDoctor?.reviews?.map((review) => (
            <div key={review._id} className="mb-4">
              <TextField
                label="Имя"
                value={review.name}
                onChange={(e) => handleReviewInputChange(e, review._id)}
                name="name"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                value={review.email}
                onChange={(e) => handleReviewInputChange(e, review._id)}
                name="email"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Отзыв"
                value={review.text}
                onChange={(e) => handleReviewInputChange(e, review._id)}
                name="text"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  onClick={() => handleSaveReview(review._id)}
                  variant="contained"
                  color="primary"
                >
                  Сохранить
                </Button>
                <Button
                  onClick={() => handleDeleteReview(review._id)}
                  variant="contained"
                  color="secondary"
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviews} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageDoctors;
