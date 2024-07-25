import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get("http://localhost:5000/api/doctors");
    return response.data;
  }
);

export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchDoctorById",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
    return response.data;
  }
);

export const submitReview = createAsyncThunk(
  "doctors/submitReview",
  async ({ doctorId, reviewData }) => {
    const response = await axios.post(
      `http://localhost:5000/api/doctors/${doctorId}/reviews`,
      reviewData
    );
    return response.data;
  }
);

export const bookAppointment = createAsyncThunk(
  "doctors/bookAppointment",
  async ({ doctorId, date, time, phone, email, name }) => {
    const response = await axios.post(
      `http://localhost:5000/api/doctors/${doctorId}/appointments`,
      { date, time, phone, email, name }
    );
    return response.data;
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    selectedDoctor: null,
    status: "idle",
    error: null,
  },
  reducers: {
    removeDoctor: (state, action) => {
      state.doctors = state.doctors.filter(
        (doctor) => doctor._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.selectedDoctor.reviews.push(action.payload);
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.selectedDoctor.appointments.push(action.payload);
      });
  },
});

export const { removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
