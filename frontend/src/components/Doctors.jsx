import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../store/doctorSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";

const Doctors = () => {
  const dispatch = useDispatch();
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
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Список врачей
      </Typography>
      <List>
        {doctors.map((doctor) => (
          <ListItem key={doctor._id}>
            <Avatar
              src={`http://localhost:5000/${doctor.photo}`}
              alt={doctor.name}
            />
            <ListItemText
              primary={`${doctor.name} - ${doctor.specialty}`}
              secondary={`Email: ${doctor.email} | Опыт работы: ${doctor.experience} лет | О специалисте: ${doctor.about}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Doctors;
