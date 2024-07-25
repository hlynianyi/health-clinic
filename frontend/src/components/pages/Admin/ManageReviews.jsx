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
import { useDispatch } from "react-redux";
import { fetchReviews } from "../../../store/reviewSlice";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const fetchReviewsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
      dispatch(fetchReviews()); // Обновляем состояние в Redux
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviewsData(); // Обновляем список отзывов после удаления
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedReview(null);
  };

  const handleSaveReview = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/reviews/${selectedReview._id}`,
        selectedReview
      );
      fetchReviewsData(); // Обновляем список отзывов после редактирования
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedReview({ ...selectedReview, [name]: value });
  };

  return (
    <div>
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления отзывами о клинике
      </h2>
      <ul className="mt-8 flex flex-col gap-2">
        {reviews.map((review) => (
          <li
            className="border-b-[1px] border-b-mainblue py-2"
            key={review._id}
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                Отзыв оставлен:{" "}
                <span className="ml-1 font-normal">
                  {review.name} - {review.date}
                </span>
              </p>
              <p className="font-semibold">
                Электронная почта:{" "}
                <span className="ml-1 font-normal">{review.email}</span>
              </p>
              <p className="font-semibold">
                Номер телефона:{" "}
                <span className="ml-1 font-normal">{review.phone}</span>
              </p>
              <p className="font-semibold">
                Текст отзыва:{" "}
                <span className="ml-1 font-normal">{review.text}</span>
              </p>
            </div>
            <div className="flex gap-3 pt-3">
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
                onClick={() => handleEdit(review)}
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
                onClick={() => handleDelete(review._id)}
              >
                Удалить
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Редактировать Отзыв</DialogTitle>
        <DialogContent>
          <div className="flex flex-col my-4">
            <TextField
              required
              id="name"
              label="Имя:"
              name="name"
              value={selectedReview?.name || ""}
              onChange={handleReviewInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="email"
              label="Email:"
              type="email"
              name="email"
              value={selectedReview?.email || ""}
              onChange={handleReviewInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="phone"
              label="Телефон:"
              name="phone"
              value={selectedReview?.phone || ""}
              onChange={handleReviewInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <TextField
              required
              id="text"
              label="Текст отзыва:"
              name="text"
              value={selectedReview?.text || ""}
              onChange={handleReviewInputChange}
              style={{ width: "100%", marginBottom: "16px" }}
              multiline
              rows={4}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSaveReview} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageReviews;
