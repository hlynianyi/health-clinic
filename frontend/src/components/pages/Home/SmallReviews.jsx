import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import reviewsIcon from "../../../assets/reviews_icon.webp";
import reviewsFemale1 from "../../../assets/reviewsFemale1.png";
import reviewsFemale2 from "../../../assets/reviewsFemale2.png";
import reviewsMale1 from "../../../assets/reviewsMale1.png";
import reviewsMale2 from "../../../assets/reviewsMale2.png";
import { useNavigate } from "react-router-dom";

const avatarImages = [
  reviewsFemale1,
  reviewsFemale2,
  reviewsMale1,
  reviewsMale2,
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CustomDot = ({ onClick, ...rest }) => {
  const { onMove, index, active } = rest;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
      style={{
        background: active ? "#28926E" : "#343434",
        borderRadius: "50%",
        width: "10px",
        height: "10px",
        display: "inline-block",
        margin: "0 5px",
      }}
    />
  );
};

const SmallReviews = () => {
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.reviews.reviews);
  // Функция для получения случайных отзывов и случайных аватаров
  const getRandomReviews = (reviews, count) => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((review, index) => ({
      ...review,
      avatar: avatarImages[index % avatarImages.length],
    }));
  };

  const randomReviews = getRandomReviews(reviews, Math.min(reviews.length, 5));

  return (
    <section className="mt-4">
      <div className="flex flex-col items-center">
        <img src={reviewsIcon} alt="отзывы" className="w-[40px]" />
        <h2 className="text-2xl">Отзывы</h2>
      </div>
      <Carousel
        responsive={responsive}
        ssr
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        containerClass="carousel-container"
        customDot={<CustomDot />}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        showDots
      >
        {randomReviews.map((review) => (
          <div key={review._id} className="flex flex-col justify-center p-4">
            <div
              className="bg-white rounded-lg p-4 shadow-lg"
              style={{ maxWidth: "500px", height: "430px", overflow: "hidden" }}
            >
              <div className="flex flex-row gap-4">
                <img
                  src={review.avatar}
                  alt="avatar"
                  className="w-[50px] h-[50px] rounded-full mb-2 mt-1"
                />
                <div>
                  <h3 className="font-medium text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.date}</p>
                </div>
              </div>

              <p className="mt-2 overflow-hidden text-ellipsis ">
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => navigate("/reviews")}
          className="px-4 py-2 rounded-lg border-[1px] border-maingreen hover:bg-maingreen hover:text-white"
        >
          Оставить отзыв
        </button>
        <button
          onClick={() => navigate("/reviews")}
          className="px-4 py-2 rounded-lg border-[1px] border-maingreen hover:bg-maingreen hover:text-white"
        >
          Все отзывы
        </button>
      </div>
    </section>
  );
};

export default SmallReviews;
