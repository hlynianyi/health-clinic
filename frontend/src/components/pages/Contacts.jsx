import React from "react";
import hours from "../../assets/hours.webp";
import tel from "../../assets/tel.webp";
import mail from "../../assets/mail.webp";
import location from "../../assets/location.webp";
import YandexMap from "../subcomponents/YandexMap"; // Импортируйте компонент карты

const Contacts = () => {
  return (
    <section className="flex flex-col justify-between grow p-4 font-montserrat">
      <h2 className="flex justify-center  w-full lg:w-[60%] mb-6 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-lg lg:text-xl">
        КОНТАКТНАЯ ИНФОРМАЦИЯ
      </h2>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
          <section className="flex flex-row w-1/3">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col justify-center w-[35px]">
                  <img src={hours} alt="номера телефонов" className="" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg">Режим работы</h2>
                  <p>Пн-Вс: 08:00 - 22:00</p>
                </div>
              </div>
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
              <div className="flex flex-row gap-2">
                <div className="flex flex-col justify-center w-[35px]">
                  <img src={tel} alt="номера телефонов" className="" />
                </div>
                <div className="flex flex-col justify-center">
                  <p>+7 (495) 187-88-36</p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col justify-center w-[35px]">
                  <img src={mail} alt="электронная почта" className="" />
                </div>
                <div className="flex flex-col">
                  <p>nademidova.clinic@mail.ru</p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex grow w-2/3 bg-bggray">
            <div className="flex grow justify-center items-center">ФОТОГРАФИЯ ЦЕНТРА</div>
          </section>
        </div>
      </div>
      <YandexMap /> {/* Добавьте компонент карты */}
    </section>
  );
};

export default Contacts;
