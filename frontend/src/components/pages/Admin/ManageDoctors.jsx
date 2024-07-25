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

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
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
    setSelectedDoctor(doctor);
    setOpenEdit(true);
  };

  const handleManageReviews = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedReview(null);
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
      await axios.put(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}`,
        selectedDoctor
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
      // Обновляем локальное состояние selectedDoctor.reviews
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
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
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
            <TextField
              id="schedule"
              label="График работы:"
              name="schedule"
              value={selectedDoctor?.schedule || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              variant="filled"
            />
            <TextField
              id="about"
              label="О специалисте:"
              name="about"
              value={selectedDoctor?.about || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                marginBottom: "16px",
              }}
              variant="filled"
              multiline
              rows={4}
            />
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
