import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fetchDoctors } from "../../store/doctorSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  height: 32,
  color: "#ffff",
  backgroundColor: "#28926E",
  "&:hover": {
    backgroundColor: "#1976D2",
  },
  fontSize: 14,
}));

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div className="flex grow">
      <Box className="px-6 pt-6 w-full">
        <h2 className="mb-6 py-2 pl-2 border-[1px] border-bggray rounded-lg bg-bggray text-black font-montserrat text-lg">
          Список наших специалистов
        </h2>
        <section className="flex flex-row flex-wrap gap-4">
          {doctors.map((doctor) => (
            <div
              className="flex flex-col mb-4 p-2 w-[300px] h-[272px] border-bggray border-[2px] rounded-lg"
              key={doctor.login}
            >
              <div className="flex flex-row mb-0 h-[130px]">
                <Avatar
                  src={`http://localhost:5000/${doctor.photo}`}
                  alt={doctor.name}
                  sx={{ width: 100, height: 120, mr: 2 }}
                  variant="square"
                />
                <div className="flex flex-col">
                  <p className="font-normal mb-3">{doctor.name}</p>
                  <p className="font-semibold text-xs text-maingreen">
                    Врач {doctor.specialty.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col justify-evenly text-[14px] leading-8 mt-2">
                  <p className="flex justify-center items-center w-[100px] h-[32px] bg-bggray border-[1px] border-[#E5E7E3] rounded">
                    <span>Стаж:&nbsp;</span>
                    <span className="text-maingreen font-semibold">
                      {doctor.experience}
                    </span>
                    <span>&nbsp;лет</span>
                  </p>
                  <p className="mt-1 flex justify-center items-center w-[100px] h-[32px] bg-bggray border-[1px] border-[#E5E7E3] rounded">
                    <span>Отзывы:&nbsp;</span>
                    <span className="text-maingreen font-semibold">4</span>
                  </p>
                </div>
              </div>

              <div className="flex grow justify-center w-[100%] items-end">
                <ColorButton
                  onClick={() => navigate(`/doctor/${doctor._id}`)}
                  className="w-[100%]"
                  variant="contained"
                >
                  Записаться онлайн
                </ColorButton>
              </div>
            </div>
          ))}
        </section>
      </Box>
    </div>
  );
};

export default Doctors;
