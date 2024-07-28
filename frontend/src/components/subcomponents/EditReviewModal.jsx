import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const EditReviewModal = ({
  open,
  onClose,
  doctor,
  onChange,
  onSaveReview,
  onDeleteReview,
}) => {
  const handleReviewInputChange = (e, reviewId) => {
    const { name, value } = e.target;
    onChange((prevDoctor) => ({
      ...prevDoctor,
      reviews: prevDoctor.reviews.map((review) =>
        review._id === reviewId ? { ...review, [name]: value } : review
      ),
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Управление отзывами {doctor ? doctor.name : "Не выбран доктор"}
      </DialogTitle>
      <DialogContent>
        {doctor?.reviews?.map((review) => (
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
                onClick={() => onSaveReview(review._id)}
                variant="contained"
                color="primary"
              >
                Сохранить
              </Button>
              <Button
                onClick={() => onDeleteReview(review._id)}
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
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditReviewModal;
