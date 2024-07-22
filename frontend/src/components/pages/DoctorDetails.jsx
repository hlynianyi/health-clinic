import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { fetchDoctorById } from "../../store/doctorSlice"; // Предполагается, что этот action уже реализован
import { Box, Typography, Avatar } from "@mui/material";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctors.currentDoctor);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    // dispatch(fetchDoctorById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box className="p-6 font-montserrat">
      {doctor && (
        <div className="flex flex-col items-center">
          <Avatar
            src={`http://localhost:5000/${doctor.photo}`}
            alt={doctor.name}
            sx={{ width: 200, height: 200, mb: 4 }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Специальность: {doctor.specialty}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Опыт работы: {doctor.experience} лет
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Email: {doctor.email}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            О специалисте: {doctor.about}
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default DoctorDetails;
