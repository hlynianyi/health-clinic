import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async () => {
  const response = await axios.get('http://localhost:5000/api/doctors');
  return response.data;
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default doctorSlice.reducer;
