import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  responsiveReviews,
  CustomDot,
} from "../../subcomponents/CarouselParts";
import reviewsIcon from "../../../assets/reviews_icon.webp";
import reviewsFemale1 from "../../../assets/reviewsFemale1.png";
import reviewsFemale2 from "../../../assets/reviewsFemale2.png";
import reviewsMale1 from "../../../assets/reviewsMale1.png";
import reviewsMale2 from "../../../assets/reviewsMale2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const avatarImages = [
  reviewsFemale1,
  reviewsFemale2,
  reviewsMale1,
  reviewsMale2,
];

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

  // Функция для обрезки текста
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..";
    }
    return text;
  };

  return (
    <section className="mt-4 laptop:mb-8">
      <div className="flex flex-col items-center">
        <img
          src={reviewsIcon}
          alt="отзывы"
          className="w-[40px] text-graytext"
        />
        <h2 className="text-3xl font-medium text-graytext">Отзывы</h2>
      </div>
      <Carousel
        responsive={responsiveReviews}
        ssr
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={8000}
        keyBoardControl={true}
        customTransition="all 2.5"
        transitionDuration={2000}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        containerClass="carousel-container"
        customDot={<CustomDot />}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        showDots
      >
        {randomReviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col justify-center p-4 pb-6"
          >
            <div
              className="bg-white rounded-lg p-4 shadow-lg  mx-auto"
              style={{
                maxWidth: "500px",
                minWidth: "290px",
                height: "430px",
                overflow: "hidden",
              }}
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

              <p
                className="mt-2 overflow-hidden text-ellipsis mb-4"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 12, // Устанавливаем максимальное количество строк
                  overflow: "hidden",
                }}
              >
                {truncateText(review.text, 300)}{" "}
                {/* Устанавливаем максимальную длину текста */}
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
