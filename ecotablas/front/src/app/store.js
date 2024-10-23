// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tolvaReducer from '../features/tolvaSlice';
import tablasProducidasReducer from '../features/tablasProducidasSlice';
import empresaDonanteReducer from '../features/empresaDonanteSlice'; 

const store = configureStore({
  reducer: {
    tolva: tolvaReducer,
    tablasProducidas: tablasProducidasReducer, // Faltaba una coma aquí
    empresaDonante: empresaDonanteReducer,
  },
});

export default store;
