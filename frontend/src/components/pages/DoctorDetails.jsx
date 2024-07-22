import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctorById, submitReview } from "../../store/doctorSlice";
import { ReviewIcon } from "../../assets/ReviewIcon";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const doctor = useSelector((state) => state.doctors.selectedDoctor);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id));
    }
  }, [id, dispatch]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        submitReview({ doctorId: id, reviewData: { name, email, text } })
      );
      setName("");
      setEmail("");
      setText("");
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

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
                    <p>{doctor.about}</p>
                  </div>
                </div>
              </section>
            </div>
            <section className="pt-1 pb-2 tablet:py-4 flex justify-between laptop:justify-end laptop:gap-4">
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-maingreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Оставить отзыв
              </button>
              <button className="bg-maingreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Записаться на прием
              </button>
            </section>
            {showReviewForm && (
              <form
                className="mb-4 bg-bggray rounded-lg p-6"
                onSubmit={handleReviewSubmit}
              >
                <h2 className="text-2xl font-medium mb-8">Оставить отзыв:</h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="name"
                  >
                    Ф.И.О:
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="text"
                  >
                    Отзыв:
                  </label>
                  <textarea
                    required
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-maingreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Отправить отзыв
                  </button>
                </div>
              </form>
            )}
            <section className="my-2 flex flex-col">
              <h2 className="flex justify-center w-full mb-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat">
                ОТЗЫВЫ
              </h2>
              <div className="w-full">
                {doctor.reviews && doctor.reviews.length > 0 ? (
                  doctor.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white mb-4 p-4 rounded shadow w-full"
                    >
                      <div className="flex flex-row w-full">
                        <div className="mr-4 border-black rounded-full bg-bggray p-4 w-[68px] h-[68px]">
                          <ReviewIcon />
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-medium text-lg">{review.name}</p>
                          <p className="mt-2 mb-4 px-4 py-1 text-gray-600 text-[14px] bg-maingreen text-white rounded w-[180px]">
                            Отзыв от:{" "}
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                          <p className="font-sans text-base">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Нет отзывов</p>
                )}
              </div>
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
