// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchDoctors = createAsyncThunk(
//   "doctors/fetchDoctors",
//   async () => {
//     const response = await axios.get("http://localhost:5000/api/doctors");
//     return response.data;
//   }
// );

// const doctorSlice = createSlice({
//   name: "doctors",
//   initialState: {
//     doctors: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDoctors.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default doctorSlice.reducer;

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

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    selectedDoctor: null,
    status: "idle",
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default doctorSlice.reducer;
