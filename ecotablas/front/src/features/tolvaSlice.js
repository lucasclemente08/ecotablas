import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import builderApiUrl from '../utils/BuilderApi';


export const fetchTolva = createAsyncThunk('http://localhost:61274/api/Tolva/ListarTodo', async () => {
  const response = await axios.get("http://www.gestiondeecotablas.somee.com/api/Tolva/ListarTodo");

  return response.data;
});

export const addTolva = createAsyncThunk('tolva/addTolva', async (formValues) => {
  const response = await axios.post("http://www.gestiondeecotablas.somee.com/api/Tolva/Insertar", formValues);

  return response.data;
});


export const editTolva = createAsyncThunk('tolva/editTolva', async ({ id, formValues }) => {
  const response = await axios.put(builderApiUrl(`Tolva/Modificar/${id}`), formValues);
  return response.data;
});


export const deleteTolva = createAsyncThunk('tolva/deleteTolva', async (id) => {
  await axios.delete(builderApiUrl(`http://localhost:61274/api/tolvas/${id}`));
  return id;
});

const tolvaSlice = createSlice({
  name: 'tolva',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch data
      .addCase(fetchTolva.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTolva.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTolva.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add new item
      .addCase(addTolva.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Edit item
      .addCase(editTolva.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.ID === action.payload.ID);
        state.data[index] = action.payload;
      })
      // Delete item
      .addCase(deleteTolva.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.ID !== action.payload);
      });
  },
});

export default tolvaSlice.reducer;
