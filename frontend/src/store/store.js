// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import doctorReducer from "./doctorSlice";
// import appointmentReducer from "./appointmentSlice";
// import reviewReducer from "./reviewSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     appointment: appointmentReducer,
//     doctors: doctorReducer,
//     reviews: reviewReducer,
//   },
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import doctorReducer from "./doctorSlice";
import authReducer from "./authSlice";
import appointmentReducer from "./appointmentSlice";
import reviewReducer from "./reviewSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  doctors: doctorReducer,
  auth: authReducer,
  appointment: appointmentReducer,
  reviews: reviewReducer,
  // add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
