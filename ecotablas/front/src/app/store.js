// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tolvaReducer from '../features/tolva/tolvaSlice';

const store = configureStore({
  reducer: {
    tolva: tolvaReducer,
    // agrega otros reductores aquí
  },
});

export default store;
