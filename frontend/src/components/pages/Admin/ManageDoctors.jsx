import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/doctors/${id}`);
    setDoctors(doctors.filter((doctor) => doctor._id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-doctor/${id}`);
  };

  return (
    <div>
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Панель управления докторами
      </h2>
      <ul className="mt-8 flex flex-col gap-2">
        {doctors.map((doctor) => (
          <li
            key={doctor._id}
            className="flex justify-between py-1 border-b-[1px] border-b-mainblue"
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
                onClick={() => handleEdit(doctor._id)}
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
                onClick={() => handleDelete(doctor._id)}
              >
                Удалить
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDoctors;
