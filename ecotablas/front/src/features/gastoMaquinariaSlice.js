import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://www.ecotablasapi.somee.com/api/GastoMaquinaria';

// Async thunk para obtener todos los gastos de maquinaria
export const fetchGastos = createAsyncThunk('gastoMaquinaria/fetchGastos', async () => {
  const response = await axios.get(`${API_URL}/GetAll`);

  return response.data;
});

// Async thunk para agregar un nuevo gasto de maquinaria
export const addGasto = createAsyncThunk('gastoMaquinaria/addGasto', async (nuevoGasto) => {
  const response = await axios.post(`${API_URL}/Create`, nuevoGasto);
  return response.data;
});

// Async thunk para actualizar un gasto de maquinaria
export const updateGasto = createAsyncThunk('gastoMaquinaria/updateGasto', async (gasto) => {
  const response = await axios.put(`${API_URL}/Update/${gasto.IdGastoMaquinaria}`, gasto);
  return response.data;
});

// Async thunk para eliminar un gasto de maquinaria
export const deleteGasto = createAsyncThunk('gastoMaquinaria/deleteGasto', async (id) => {
  await axios.delete(`http://www.gestiondeecotablas.somee.com/api/GastoMaquinaria/Delete/${id}`);
  return id;
});

// Slice para gastoMaquinaria
const gastoMaquinariaSlice = createSlice({
  name: 'gastoMaquinaria',
  initialState: {
    gastos: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer de ejemplo si necesitas alguna acción extra
  },
  extraReducers: (builder) => {
    builder
      // Obtener gastos
      .addCase(fetchGastos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGastos.fulfilled, (state, action) => {
        state.loading = false;
        state.gastos = action.payload;
      })
      .addCase(fetchGastos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agregar gasto
      .addCase(addGasto.fulfilled, (state, action) => {
        state.gastos.push(action.payload);
      })
      // Actualizar gasto
      .addCase(updateGasto.fulfilled, (state, action) => {
        const index = state.gastos.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.gastos[index] = action.payload;
        }
      })
      // Eliminar gasto
      .addCase(deleteGasto.fulfilled, (state, action) => {
        state.gastos = state.gastos.filter(g => g.id !== action.payload);
      });
  },
});

export default gastoMaquinariaSlice.reducer;
