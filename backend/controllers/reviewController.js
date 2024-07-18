const Review = require('../models/Review');
const moment = require('moment');

exports.addReview = async (req, res) => {
  const { name, email, phone, text } = req.body;
  const date = moment().format('DD.MM.YYYY');

  try {
    const review = new Review({ name, email, phone, text, date });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(400).json({ message: 'Error adding review', error });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching reviews', error });
  }
};
