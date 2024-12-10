import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchTablasProducidas = createAsyncThunk(
  'tablasProducidas/fetchTablasProducidas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://www.trazabilidadodsapi.somee.com/api/TablaProducidas/ListarTodo');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTablaProducida = createAsyncThunk(
  'tablasProducidas/addTablaProducida',
  async (newTabla, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:61274/api/TablaProducidas/Insertar', newTabla);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTablaProducida = createAsyncThunk(
  'tablasProducidas/editTablaProducida',
  async ({ id, updatedTabla }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:61274/api/TablaProducidas/Update/${id}`, updatedTabla);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTablaProducida = createAsyncThunk(
  'tablasProducidas/deleteTablaProducida',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://www.gestiondeecotablas.somee.com/api/TablaProducidas/Borrar/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const tablasProducidasSlice = createSlice({
  name: 'tablasProducidas',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTablasProducidas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablasProducidas.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTablasProducidas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      .addCase(addTablaProducida.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTablaProducida.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addTablaProducida.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit TablaProducida
      .addCase(editTablaProducida.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTablaProducida.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((tabla) => tabla.ID_Tabla === action.payload.ID_Tabla);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editTablaProducida.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete TablaProducida
      .addCase(deleteTablaProducida.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTablaProducida.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((tabla) => tabla.ID_Tabla !== action.payload);
      })
      .addCase(deleteTablaProducida.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default tablasProducidasSlice.reducer;
