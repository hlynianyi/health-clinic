import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAppointment = createAsyncThunk('appointment/createAppointment', async (appointment) => {
  const response = await axios.post('http://localhost:5000/api/appointments', appointment);
  return response.data;
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default appointmentSlice.reducer;
