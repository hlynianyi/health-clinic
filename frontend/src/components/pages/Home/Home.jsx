import React from "react";
import YandexMap from "../../subcomponents/YandexMap";
import SmallReviews from "./SmallReviews";

const Home = () => {
  return (
    <>
      <SmallReviews />
      <YandexMap /> {/* Добавьте компонент карты */}
    </>
  );
};

export default Home;
