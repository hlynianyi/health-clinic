import React from "react";
import { responsiveAbout, CustomDot } from "../../subcomponents/CarouselParts";
import SmallAbout1 from "../../../assets/SmallAbout1.jpg";
import SmallAbout2 from "../../../assets/SmallAbout2.jpg";
import SmallAbout3 from "../../../assets/SmallAbout3.jpg";
import CheckIcon from "@mui/icons-material/Check";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ImagesArray = [SmallAbout1, SmallAbout2, SmallAbout3];

const SmallAbout = () => {
  return (
    <section className="flex flex-col laptop:flex-row justify-between mt-4 laptop:mb-8 tablet:mt-6 p-4 tablet:pt-6">
      <div className="flex flex-col">
        <h2 className="mb-8 text-3xl font-semibold text-graytext ">
          О клинике
        </h2>
        <h4 className="mb-4 text-sm font-bold">
          Мы рады приветствовать вас на нашем сайте!
        </h4>
        <h4 className="mb-4 text-sm">
          «<span className="font-medium">Медицинский Центр на Демидова</span>»
          это:
        </h4>
        <article className="flex flex-col text-sm gap-3 leading-[23px]">
          <p className="">
            <CheckIcon sx={{ width: "18px", height: "18px" }} />{" "}
            <span>
              Современное высококачественное оборудование. Мы проводим точные
              исследования быстро, результата не надо ждать на следующий день!
            </span>
          </p>
          <p className="">
            <CheckIcon sx={{ width: "18px", height: "18px" }} />{" "}
            <span>
              Мы придерживаемся комплексного подхода в проведении
              диагностических процедур, считаем, что исследования должны быть
              своевременными, а лечение обоснованным.
            </span>
          </p>
          <p className="">
            <CheckIcon sx={{ width: "18px", height: "18px" }} />{" "}
            <span className="">
              Обеспечение доступности наших услуг это одна из главных целей
              нашего центра. Бесплатные первичные консультации стоматологов,
              уролога и проктолога, а также гибкая система скидок.
            </span>
          </p>
        </article>
      </div>
      <div className="mt-6 laptop:mt-0 mb-2 laptop:w-[500px] laptop:ml-10">
        <Carousel
          responsive={responsiveAbout}
          ssr
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={8000}
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
          {ImagesArray.map((image, idx) => (
            <div
              key={idx}
              className="rounded-lg mb-6"
              style={{
                // maxWidth: "500px",
                // height: "430px",
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                alt="clinic images"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default SmallAbout;
