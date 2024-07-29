import React from "react";
import YandexMap from "../../subcomponents/YandexMap";
import SmallReviews from "./SmallReviews";
import SmallAbout from "./SmallAbout";

const Home = () => {
  return (
    <>
      <SmallAbout />
      <SmallReviews />
      <YandexMap /> {/* Добавьте компонент карты */}
    </>
  );
};

export default Home;
