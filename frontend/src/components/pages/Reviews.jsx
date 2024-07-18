import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchReviews } from "../../store/reviewSlice";
import { ReviewIcon } from "../../assets/ReviewIcon";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const status = useSelector((state) => state.reviews.status);
  const error = useSelector((state) => state.reviews.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchReviews());
    }
  }, [status, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews/add", {
        name,
        email,
        phone,
        text,
      });
      dispatch(fetchReviews());
      setName("");
      setEmail("");
      setPhone("");
      setText("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <section className="flex grow flex-row p-6 font-montserrat">
      <div className="flex flex-col w-3/5 bg-bggray rounded-lg p-6">
        <div className="w-full">
          <h2 className="text-2xl font-medium mb-4">
            Отзывы о клинике и наших врачах:
          </h2>
          <div className="flex flex-col w-full">
            {currentReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white mb-4 p-4 rounded shadow w-full"
              >
                <div className="flex flex-row w-full">
                  <div className="mr-4 border-black rounded-full bg-bggray p-4 w-[78px] h-[78px]">
                    <ReviewIcon />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="font-medium text-lg">{review.name}</p>
                    <p className="mt-2 mb-4 px-4 py-1 text-gray-600 text-[14px] bg-maingreen text-white rounded w-[180px]">
                      Отзыв от: {review.date}
                    </p>
                    <p className="font-sans text-lg">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-maingreen text-white"
                    : "bg-white text-maingreen"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-2/5 ml-6">
        <form className="mb-8 bg-bggray rounded-lg p-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-medium mb-8">Оставить отзыв:</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Ф.И.О:
            </label>
            <input
              required
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              required
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="phone"
            >
              Телефон:
            </label>
            <input
              required
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="text"
            >
              Текст отзыва:
            </label>
            <textarea
              required
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-maingreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reviews;
