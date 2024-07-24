import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDoctorById, submitReview } from "../../store/doctorSlice";
import { ReviewIcon } from "../../assets/ReviewIcon";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
            {doctor.name}
          </h2>
          <section className="flex flex-col text-base mb-4">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              <div className=" flex flex-col justify-center shrink-0 laptop:flex-row laptop:w-full laptop:gap-4">
                <aside className="flex shrink-0 flex-row justify-center w-full h-min rounded-lg bg-bggray p-1 mb-2 laptop:flex-col laptop:w-1/3 tablet:gap-2">
                  <div className="w-2/4 p-1 laptop:w-full flex justify-center">
                    <img
                      className="min-w-[191px] shrink-0 rounded-lg tablet:rounded-lg object-contain mix-blend-normal"
                      src={`http://localhost:5000/${doctor.photo}`}
                      alt={doctor.name}
                    />
                  </div>
                  <section className="w-2/4 flex flex-col p-1  flex justify-start gap-2  laptop:gap-2 font-semibold text-white text-[14px] tablet:text-lg laptop:w-full">
                    <button className="bg-maingreen hover:bg-mainblue py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Онлайн запись
                    </button>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-maingreen hover:bg-mainblue  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Оставить отзыв
                    </button>
                  </section>
                </aside>
                {showReviewForm && (
                  <form
                    className="mb-2 bg-bggray rounded-lg p-2 laptop:absolute laptop:py-4 laptop:px-12 laptop:right-14 large:right-[268px] desktop:right-24 laptop:w-1/2 large:w-2/5 laptop:shadow-xl laptop:transition-all laptop:duration-300 laptop:ease-in-out"
                    onSubmit={handleReviewSubmit}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Оставить отзыв:</h2>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="mr-2 laptop:mr-0 text-4xl text-gray-700 text-maingreen hover:text-bgdarkgray focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
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
                    <div className="mb-2">
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
                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="bg-maingreen hover:bg-mainblue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Отправить отзыв
                      </button>
                    </div>
                  </form>
                )}

                <section className="py-2 px-2 tablet:p-4 tablet:px-8 desktop:px-10 flex flex-col justify-start w-full  bg-bggray gap-2 rounded-lg laptop:w-screen">
                  <div className="pb-2 flex border-b-[1px] border-b-mainblue">
                    <div className="w-[140px] mr-3">
                      <p className="font-medium">Должность</p>
                    </div>
                    <div className="">Врач</div>
                  </div>

                  <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                    <div className="w-[140px] mr-3 shrink-0">
                      <p className="font-medium">Специальность</p>
                    </div>
                    <div className="flex-wrap">
                      <p className="">{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                    <div className="w-[140px] mr-3 shrink-0">
                      <p className="font-medium">Опыт работы</p>
                    </div>
                    <div className="flex-wrap">
                      <p>{doctor.experience} лет</p>
                    </div>
                  </div>

                  <div className="pb-2 flex border-b-[1px] border-b-mainblue wrap">
                    <div className="w-[140px] mr-3 shrink-0">
                      <p className="font-medium">График работы</p>
                    </div>
                    <div className="flex-wrap">
                      <p>{doctor.schedule}</p>
                    </div>
                  </div>

                  <div className="pb-2 border-b-[1px] border-b-mainblue flex wrap">
                    <div className="flex-1 mr-3 shrink-0">
                      <p className="font-medium w-[140px] float-left mr-3 mb-1">
                        Образование
                      </p>
                      <p className="break-words">{doctor.education}</p>
                    </div>
                  </div>
                  <div className="pb-2 flex wrap">
                    <div className="flex-1 mr-3 shrink-0">
                      <p className="font-medium w-[140px] float-left mr-3 mb-1">
                        О специалисте
                      </p>
                      <p className="break-words">{doctor.about}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

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
                  <p className="flex justify-center">
                    У этого врача пока нет отзывов, но вы можете стать первым!
                  </p>
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
