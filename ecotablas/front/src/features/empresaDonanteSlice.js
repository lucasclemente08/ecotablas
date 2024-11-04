import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:61274/api/EmpresaDonante";

// Asincronía para obtener empresas donantes
export const fetchEmpresaDonante = createAsyncThunk(
  "ListarTodo",
  async () => {
    const response = await axios.get("http://www.gestiondeecotablas.somee.com/api/EmpresaDonante/ListarTodo");
 
    return response.data;
  }
);

// Asincronía para añadir empresa donante
export const addEmpresaDonante = createAsyncThunk(
  "empresaDonante/addEmpresaDonante",
  async (newEmpresa) => {
    const response = await axios.post(API_URL, newEmpresa);
    return { ...newEmpresa, id: response.data.id };
  }
);

// Asincronía para editar empresa donante
export const editEmpresaDonante = createAsyncThunk(
  "empresaDonante/editEmpresaDonante",
  async ({ id, empresa }) => {
    await axios.put(`${API_URL}/${id}`, empresa);
    return { id, empresa };
  }
);

// Asincronía para eliminar empresa donante
export const deleteEmpresaDonante = createAsyncThunk(
  "http://www.gestiondeecotablas.somee.com/api/EmpresaDonante/Borrar",
  async (id) => {
    await axios.delete(`${"http://www.gestiondeecotablas.somee.com/api/EmpresaDonante/Borrar"}/${id}`);
    return id;
  }
);

const empresaDonanteSlice = createSlice({
  name: "empresaDonante",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Obtener empresas donantes
    builder.addCase(fetchEmpresaDonante.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmpresaDonante.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchEmpresaDonante.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Añadir empresa donante
    builder.addCase(addEmpresaDonante.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    // Editar empresa donante
    builder.addCase(editEmpresaDonante.fulfilled, (state, action) => {
      const index = state.data.findIndex((empresa) => empresa.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload.empresa;
      }
    });

    // Eliminar empresa donante
    builder.addCase(deleteEmpresaDonante.fulfilled, (state, action) => {
      state.data = state.data.filter((empresa) => empresa.id !== action.payload);
    });
  },
});

export default empresaDonanteSlice.reducer;
