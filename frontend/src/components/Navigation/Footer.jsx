import React from "react";
import hours from "../../assets/hours.webp";
import tel from "../../assets/tel.webp";
import mail from "../../assets/mail.webp";
import location from "../../assets/location.webp";

// todo: mobile responsive version

const Footer = () => {
  return (
    <footer className="lg:px-6 px-4 py-6 gap-4 flex flex-row justify-between bg-bgdarkgray font-normal font-montserrat text-white text-sm">
      <section className="flex flex-col justify-between">
        <div className="flex flex-col nowrap text-baseline">
          <h2>Многопрофильный</h2>
          <h2>медицинский центр</h2>
          <h2>на Демидова</h2>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">Режим работы</h2>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-center w-[22px]">
              <img src={hours} alt="часы работы" className="" />
            </div>
            <div className="flex flex-col">
              <p>Пн-Вс: 08:00 - 22:00</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col ">
        <h2 className="text-lg mb-4">О клинике</h2>
      </section>
      <section className="flex flex-col ">
        <h2 className="text-lg mb-4">Пациентам</h2>
      </section>
      <section className="flex flex-col ">
        {/* contacts */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">Контакты</h2>
          {/* location */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col justify-center w-[22px]">
              <img
                src={location}
                alt="адрес клиники"
                className="h-[30px] w-[18px]"
              />
            </div>
            <div className="flex flex-col">
              <p>г. Михайловск</p>
              <p>ул. Демидова, д. 142/2</p>
            </div>
          </div>
          {/* phones */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col justify-center w-[22px]">
              <img src={tel} alt="номера телефонов" className="" />
            </div>
            <div className="flex flex-col">
              <p>+7 (495) 187-88-36</p>
            </div>
          </div>
          {/* post */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col justify-center w-[22px]">
              <img src={mail} alt="электронная почта" className="" />
            </div>
            <div className="flex flex-col">
              <p>nademidova.clinic@mail.ru</p>
            </div>
          </div>
        </div>
        {/* work hours */}
        <div className=""></div>
      </section>
    </footer>
  );
};

export default Footer;
// 356242, Ставропольский край, Шпаковский р-н, г Михайловск, ул Демидова, д. 142/2

/**
 * 
 * ОГРН
1242600003700
от 22 марта 2024 г.
ИНН/КПП
2623034280
262301001

 */
