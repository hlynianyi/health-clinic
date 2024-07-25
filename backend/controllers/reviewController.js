const Review = require("../models/Review");
const moment = require("moment");

exports.addReview = async (req, res) => {
  const { name, email, phone, text } = req.body;
  const date = moment().format("DD.MM.YYYY");

  try {
    const review = new Review({ name, email, phone, text, date });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(400).json({ message: "Error adding review", error });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: "Error fetching reviews", error });
  }
};

// upd
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, text } = req.body;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.name = name || review.name;
    review.email = email || review.email;
    review.phone = phone || review.phone;
    review.text = text || review.text;

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(400).json({ message: "Error updating review", error });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review", error });
  }
};
