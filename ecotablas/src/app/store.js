// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tolvaReducer from '../features/tolvaSlice';
import tablasProducidasReducer from '../features/tablasProducidasSlice';
import empresaDonanteReducer from '../features/empresaDonanteSlice'; 
import gastoMaquinariaReducer from '../features/gastoMaquinariaSlice';

const store = configureStore({
  reducer: {
    tolva: tolvaReducer,
    tablasProducidas: tablasProducidasReducer, 
    empresaDonante: empresaDonanteReducer,
    gastoMaquinaria: gastoMaquinariaReducer,
  },
});

export default store;
