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
  Grid
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
          <ListItem key={doctor._id} alignItems="flex-start">
            <Grid container spacing={2}>
              <Grid item>
                <Avatar
                  src={`http://localhost:5000/api/doctors/photo/${doctor.photo}`} // Обновленный URL для фотографии
                  alt={doctor.name}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs>
                <ListItemText
                  primary={`${doctor.name} - ${doctor.specialty}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Email: {doctor.email}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Опыт работы: {doctor.experience} лет
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        О специалисте: {doctor.about}
                      </Typography>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Doctors;
