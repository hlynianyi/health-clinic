import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctorById } from "../../store/doctorSlice";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const doctor = useSelector((state) => state.doctors.selectedDoctor);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  console.log("doctor :>> ", doctor);
  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {doctor ? (
        <>
          <h2 className="flex justify-center w-full mb-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
            {doctor.name}
          </h2>
          <section className="flex flex-col text-base">
            <div className="flex flex-col lg:flex-row justify-between ">
              <aside className="flex flex-col items-center lg:w-1/3 w-full rounded-lg bg-bggray laptop:items-center laptop:align-center p-4">
                <img
                  className="w-[250px] rounded-full tablet:rounded-lg object-cover mix-blend-normal"
                  src={`http://localhost:5000/${doctor.photo}`}
                  alt={doctor.name}
                />
              </aside>
              <section className="py-1 px-2 tablet:p-4 flex flex-col justify-start w-full lg:w-2/3 bg-bggray gap-2">
                <div className="pb-2 flex border-b-[1px] border-b-mainblue">
                  <div className="w-[140px] mr-3">
                    <p>Должность</p>
                  </div>
                  <div className="">Врач</div>
                </div>

                <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                  <div className="w-[140px] mr-3 shrink-0">
                    <p>Специальность</p>
                  </div>
                  <div className="flex flex-row flex-start gap-2 flex-wrap">
                    <p>{doctor.specialty}</p>
                  </div>
                </div>

                <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                  <div className="w-[140px] mr-3 shrink-0">
                    <p>Опыт работы</p>
                  </div>
                  <div className="flex flex-row flex-start gap-2 flex-wrap">
                    <p>{doctor.experience} лет</p>
                  </div>
                </div>

                <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                  <div className="w-[140px] mr-3 shrink-0">
                    <p>График работы</p>
                  </div>
                  <div className="flex flex-row flex-start gap-2 flex-wrap">
                    <p>Понедельник, Среда, Пятница; 10:00 - 16:00</p>
                  </div>
                </div>

                <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                  <div className="w-[140px] mr-3 shrink-0">
                    <p>Образование</p>
                  </div>
                  <div className="flex flex-row flex-start gap-2 flex-wrap">
                    <p>
                      1995г. Московский государственный медико-стоматологический
                      университет Евдокимова (лечебное дело ) 2011г. Московский
                      государственный медико-стоматологический университет
                      Евдокимова ( андрология) Ординатура: 2012 г. Дагестанский
                      государственный медицинский университет (
                      дерматовенерология)
                    </p>
                  </div>
                </div>

                <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                  <div className="w-[140px] mr-3 shrink-0">
                    <p>О специалисте</p>
                  </div>
                  <div className="flex flex-row flex-start gap-2 flex-wrap">
                    <p>{doctor.about} лет</p>
                  </div>
                </div>
              </section>
            </div>
            <section className="my-4 flex justify-evenly">
              <button>Добавление отзыва</button>
              <button>Запись на прием</button>
            </section>
            <section className="my-2 flex flex-col">
              <h2 className="flex justify-center w-full mb-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat">
                ОТЗЫВЫ
              </h2>
              <div className="w-full">ОТЗЫВЫ БУДУТ ТУТ</div>
            </section>
          </section>
        </>
      ) : (
        <p>No doctor found</p>
      )}
    </>
  );
};

export default DoctorDetails;
