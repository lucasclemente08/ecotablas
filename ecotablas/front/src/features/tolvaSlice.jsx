// src/features/tolva/tolvaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tolvaSlice = createSlice({
  name: 'tolva',
  initialState: {
    data: [],
    loading: false,
    mensaje: '',
  },
  reducers: {
    fetchTolvaStart: (state) => {
      state.loading = true;
    },
    fetchTolvaSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchTolvaFailure: (state, action) => {
      state.loading = false;
      state.mensaje = action.payload;
    },
    addTolva: (state, action) => {
      state.data.push(action.payload);
    },
    editTolva: (state, action) => {
      const index = state.data.findIndex(item => item.ID === action.payload.ID);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteTolva: (state, action) => {
      state.data = state.data.filter(item => item.ID !== action.payload);
    },
  },
});

export const { fetchTolvaStart, fetchTolvaSuccess, fetchTolvaFailure, addTolva, editTolva, deleteTolva } = tolvaSlice.actions;

export default tolvaSlice.reducer;
