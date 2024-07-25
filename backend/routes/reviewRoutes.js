const express = require("express");
const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/add", addReview);
router.get("/", getReviews);

router.put("/:id", updateReview); // Новый маршрут для обновления отзыва
router.delete("/:id", deleteReview); // Новый маршрут для удаления отзыва

module.exports = router;
