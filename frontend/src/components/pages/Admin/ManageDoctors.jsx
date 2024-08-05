import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import EditDoctorDialog from "../../subcomponents/EditDoctorModal";
import ManageReviewsDialog from "../../subcomponents/EditReviewModal";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors(); // Повторный вызов для обновления списка
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor({
      ...doctor,
      startHour: doctor.schedule?.hours[0] || 8,
      endHour: doctor.schedule?.hours[1] || 16,
      days: doctor.schedule?.days || [],
    });
    setOpenEdit(true);
  };

  const handleManageReviews = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenReviews(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedDoctor(null);
  };

  const handleCloseReviews = () => {
    setOpenReviews(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = async () => {
    try {
      const { days, startHour, endHour, photo, ...rest } = selectedDoctor;
      const formData = new FormData();
      formData.append("login", rest.login);
      formData.append("password", rest.password);
      formData.append("name", rest.name);
      formData.append("email", rest.email);
      formData.append("specialty", rest.specialty);
      formData.append("experience", rest.experience);
      formData.append("about", rest.about);
      formData.append("education", rest.education);
      formData.append(
        "schedule",
        JSON.stringify({ days, hours: [startHour, endHour] })
      );

      if (photo && typeof photo !== "string") {
        formData.append("photo", photo);
      }

      await axios.put(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchDoctors();
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };
  const handleReviewInputChange = (updatedDoctor) => {
    setSelectedDoctor(updatedDoctor);
  };

  const handleSaveReview = async (reviewId) => {
    try {
      const review = selectedDoctor.reviews.find((r) => r._id === reviewId);
      await axios.put(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}/reviews/${reviewId}`,
        { ...review }
      );
      setSelectedDoctor((prevDoctor) => ({
        ...prevDoctor,
        reviews: prevDoctor.reviews.map((r) =>
          r._id === reviewId ? { ...review } : r
        ),
      }));
      handleCloseReviews();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${selectedDoctor._id}/reviews/${reviewId}`
      );
      setSelectedDoctor((prevDoctor) => ({
        ...prevDoctor,
        reviews: prevDoctor.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления докторами
      </h2>
      <ul className="mt-8 flex flex-col gap-2">
        {doctors.map((doctor) => (
          <li
            key={doctor._id}
            className="flex flex-col laptop:flex-row gap-2 justify-between py-1 border-b-[1px] border-b-mainblue"
          >
            <span className="font-semibold flex flex-col justify-center">
              {doctor.name}
            </span>
            <div className="flex gap-3">
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleEdit(doctor)}
              >
                Редактировать
              </Button>
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleManageReviews(doctor)}
              >
                Управлять отзывами
              </Button>
              <Button
                sx={{
                  bgcolor: "#343434",
                  color: "#FFFF",
                  height: "40px",
                  ":hover": {
                    backgroundColor: "#28926E",
                    color: "#FFFFFF",
                  },
                }}
                onClick={() => handleDelete(doctor._id)}
              >
                Удалить
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <EditDoctorDialog
        open={openEdit}
        onClose={handleCloseEdit}
        doctor={selectedDoctor}
        onChange={handleReviewInputChange}
        onSave={handleSaveDoctor}
      />

      <ManageReviewsDialog
        open={openReviews}
        onClose={handleCloseReviews}
        doctor={selectedDoctor}
        onChange={handleReviewInputChange}
        onSaveReview={handleSaveReview}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};

export default ManageDoctors;
