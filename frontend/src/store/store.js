import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";
import appointmentReducer from "./appointmentSlice";
import reviewReducer from "./reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    doctors: doctorReducer,
    reviews: reviewReducer,
  },
});
