import React from "react";
import hours from "../../assets/hours.webp";
import tel from "../../assets/tel.webp";
import mail from "../../assets/mail.webp";
import location from "../../assets/location.webp";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// todo: mobile responsive version

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer className="py-2 px-4 tablet:px-4 tablet:py-4 laptop:px-8 desktop:px-16 large:px-64 gap-4 flex flex-col tablet:flex-row justify-between bg-bgdarkgray font-normal font-montserrat text-white text-sm">
        <section className="flex flex-row tablet:flex-col wrap justify-between">
          <div className="flex grow flex-col justify-between w-full text-lg gap-3">
            <h2 className="w-full tablet:w-[200px]">
              Медицинский центр на Демидова
            </h2>
            <div className="flex flex-row gap-2 text-base items-center justifyt-center align-center">
              <div className="flex flex w-[22px] ">
                <img src={hours} alt="часы работы" className="" />
              </div>
              <div className="flex flex-col justify-center">
                <span>Пн.-Вс., 08:00 - 22:00</span>
                {/* <span>08:00 - 22:00</span> */}
              </div>
            </div>
          </div>
        </section>
        {/* <section className="flex flex-col ">
        <h2 className="text-lg tablet:mb-4">Пациентам</h2>
      </section> */}
        <section className="flex flex-col ">
          {/* contacts */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg">Контакты</h2>
            {/* location */}
            <div className="flex flex-row gap-2">
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
            <div className="flex flex-row gap-2">
              <div className="flex flex-col justify-center w-[22px]">
                <img src={tel} alt="номера телефонов" className="" />
              </div>
              <div className="flex flex-col">
                <p>+7 (495) 187-88-36</p>
              </div>
            </div>
            {/* post */}
            <div className="flex flex-row gap-2">
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
        <section className="flex flex-col shrink-0">
          <h2 className="text-lg tablet:mb-4">О клинике</h2>
        </section>
      </footer>
      <div className="p-1 tablet:px-2 border-t-2 border-graytext flex justify-between bg-bgdarkgray text-graytext ">
        <div className="flex gap-2 items-center">
          <span>Вы</span>
          <button
            onClick={() => navigate("/admin-login")}
            className="px-3 hover:bg-maingreen hover:text-white rounded"
          >
            администратор
          </button>
          <span>|</span>
          <button
            onClick={() => navigate("/doctor-login")}
            className="px-3 hover:bg-maingreen hover:text-white rounded"
          >
            врач
          </button>
          <span>?</span>
        </div>
        <div className="">
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#28926E",
              fontSize: 8,
            }}
            onClick={() => navigate("/dashboard")}
          >
            Панель администратора
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;
