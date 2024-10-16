import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import builderApiUrl from '../utils/BuilderApi';


export const fetchEmpresa = createAsyncThunk('empresa/', async () => {
    const response = await axios.get(builderApiUrl('EmpresaD'));
    return response.data;
  });

  
  const EmpresaSlice = createSlice({
    name: 'Empresa',
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

    },
  });
  
  export default EmpresaSlice.reducer;
  