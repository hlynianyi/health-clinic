import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  console.log(reviews);
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/reviews/${id}`);
    setReviews(reviews.filter((review) => review._id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`);
  };

  return (
    <div>
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления отзывами о сайте
      </h2>
      <ul className="mt-8 flex flex-col gap-2">
        {reviews.map((review) => (
          <li
            className=" border-b-[1px] border-b-mainblue py-2"
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
                onClick={() => handleEdit(review._id)}
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
    </div>
  );
};

export default ManageReviews;
