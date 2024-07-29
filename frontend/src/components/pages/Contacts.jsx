import React from "react";
import hours from "../../assets/hours.webp";
import tel from "../../assets/tel.webp";
import mail from "../../assets/mail.webp";
import location from "../../assets/location.webp";
import fakephoto from "../../assets/fakephoto_building.jpg";

import YandexMap from "../subcomponents/YandexMap";

const Contacts = () => {
  return (
    <>
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        КОНТАКТНАЯ ИНФОРМАЦИЯ
      </h2>
      <section className="flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex justify-center w-full lg:w-2/3 bg-bggray rounded-lg">
            <img
              className="object-cover p-4  rounded-lg"
              src={fakephoto}
              alt="фото здания"
            />
          </div>
          <aside className="flex flex-col  lg:w-1/3 w-full rounded-lg bg-bggray laptop:items-center laptop:align-center p-4">
            <div className="flex flex-wrap justify-between  gap-4 lg:flex-col lg:gap-8">
              <div className="flex flex-row min-w-[280px] justify-between gap-4 shrink lg:flex-col lg:min-w-full">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col justify-center w-[35px]">
                    <img src={hours} alt="режим работы" className="" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="">Режим работы</h2>
                    <p>Пн-Вс: 08:00 - 22:00</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row min-w-[280px] justify-between gap-4 shrink-0 lg:flex-col lg:min-w-full">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col justify-center h-[52px] w-[35px]">
                    <img
                      src={location}
                      alt="адрес клиники"
                      className="h-[35px] w-[28px] ml-[2px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>г. Михайловск</p>
                    <p>ул. Демидова, д. 142/2</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row min-w-[280px] justify-between gap-4 shrink-0 lg:flex-col lg:min-w-full">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col justify-center w-[35px]">
                    <img src={tel} alt="номера телефонов" className="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>+7 (495) 187-88-36</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row min-w-[280px] justify-between gap-4 shrink-0 lg:flex-col lg:min-w-full">
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-col justify-center w-[35px]">
                    <img src={mail} alt="электронная почта" className="" />
                  </div>
                  <div className="flex flex-col">
                    <p>nademidova.clinic@mail.ru</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <YandexMap /> 
    </>
  );
};

export default Contacts;
