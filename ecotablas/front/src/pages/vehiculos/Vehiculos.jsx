import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import LoadingTable from "../../components/LoadingTable";
import builderApiUrl from "../../utils/BuilderApi";
import axios from "axios";
import {
  getAllVehiculos,
  addVehiculos,
  editVehiculos,
  deleteVehiculos,
} from "../../api/VehiculosAPI";
import { addReparacion } from "../../api/ReparacionesAPI";

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [EstadoVehiculos, setEstadoVehiculos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [vehiculoId, setVehiculoId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalReparacion, setModalReparacion] = useState(false);

  const [mensaje, setMensaje] = useState("");

  const [formValues, setFormValues] = useState({
    Marca: "",
    Modelo: "",
    Año: "",
    Color: "",
    Tipo: "",
    FechaUltimaInspeccion: "",
    Combustible: "",
    NumeroPlaca: "",
    NumeroIdentificador: "",
    IdEstado: "",
  });

  const [reparacionValues, setReparacionValues] = useState({
    IdMaquinaria: "",
    IdVehiculo: "",
    Detalle: "",
    FechaInicio: "",
    IdEstadoReparacion: "",
    Costo: "",
  });

  const BASE_URL = ("http://localhost:61274/api/Vehiculos");
  const BASE_URL_State = ("http://localhost:61274/api/EstadosVehiculos");

  const abrirModalEdit = (vehiculo) => {
    setVehiculoId(vehiculo.IdVehiculo);
    setFormValues({
      Marca: vehiculo.Marca,
      Modelo: vehiculo.Modelo,
      Año: vehiculo.Año,
      Color: vehiculo.Color,
      Tipo: vehiculo.Tipo,
      FechaUltimaInspeccion: vehiculo.FechaUltimaInspeccion
        ? vehiculo.FechaUltimaInspeccion.slice(0, 10)
        : "",
      Combustible: vehiculo.Combustible,
      NumeroPlaca: vehiculo.NumeroPlaca,
      NumeroIdentificador: vehiculo.NumeroIdentificador,
      IdEstado: vehiculo.IdEstado,

    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const abrirModal = () => {
    setFormValues({
      Marca: "",
      Modelo: "",
      Año: "",
      Color: "",
      Tipo: "",
      FechaUltimaInspeccion: "",
      Combustible: "",
      NumeroPlaca: "",
      NumeroIdentificador: "",
      IdEstado: "",
    }); // Reiniciar los valores del formulario
    setModalAbierto(true);
  };
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalReparacion = (id) => {
    setVehiculoId(id);
    setReparacionValues({ ...reparacionValues, IdVehiculo: id });
    setModalReparacion(true);
  };
  const cerrarModalReparacion = () => setModalReparacion(false);

  const fetchVehiculos = async () => {
    setLoading(true);
    try {
      const res = await getAllVehiculos(); // Usar la función de API para obtener los datos
      setVehiculos(res.data); // Actualizar el estado con la respuesta
    } catch (error) {
      setMensaje("Error al cargar los vehiculos.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!formValues.Marca) {
      setMensaje("La marca es obligatoria.");
      isValid = false;
    } else if (!formValues.Modelo) {
      setMensaje("Modelo es obligatorio.");
      isValid = false;
    } else if (!formValues.Año) {
      setMensaje("Año es obligatorio.");
      isValid = false;
    } else if (!formValues.Color) {
      setMensaje("Color es obligatorio.");
      isValid = false;
    } else if (!formValues.Tipo) {
      setMensaje("Tipo es obligatorio.");
      isValid = false;
    } else if (!formValues.FechaUltimaInspeccion) {
      setMensaje("Fecha es obligatoria.");
      isValid = false;
    } else if (!formValues.Combustible) {
      setMensaje("Combustible es obligatorio.");
      isValid = false;
    } else if (!formValues.NumeroPlaca) {
      setMensaje("Numero Placa es obligatorio.");
      isValid = false;
    } else if (!formValues.NumeroIdentificador) {
      setMensaje("Numero es obligatorio.");
      isValid = false;
    } else if (!formValues.IdEstado) {
      setMensaje("Estado es obligatorio.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${BASE_URL}/Insertar`, formValues);
      if (response) {
        await fetchVehiculos();

        setMensaje("Inserción exitosa");
      } else {
        setMensaje("Error: no se recibió un dato válido de la API.");
      }

      setModalAbierto(false);
    } catch (error) {
      setMensaje("Error al agregar el vehículo.");
      console.error("Error al agregar el vehículo:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    try {
      await editVehiculos(vehiculoId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      await fetchVehiculos(); // Actualiza la lista
    } catch (error) {
      setMensaje("Error al modificar el vehículo.");
      console.error("Error al modificar el vehículo:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateReparacionForm = () => {
    let isValid = true;
    if (!reparacionValues.Detalle) {
      setMensaje("El detalle es obligatorio.");
      isValid = false;
    } else if (!reparacionValues.FechaInicio) {
      setMensaje("La fecha de inicio es obligatoria.");
      isValid = false;
    } else if (!reparacionValues.IdEstadoReparacion) {
      setMensaje("El estado de la reparación es obligatorio.");
      isValid = false;
    } else if (!reparacionValues.Costo) {
      setMensaje("El costo es obligatorio.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmitReparacion = async () => {
    if (!validateReparacionForm()) return;

    try {
      // Primero, agrega la reparación
      // Primero, agrega la reparación
      await addReparacion(reparacionValues);
      setMensaje("Reparación agregada exitosamente");

      // Luego, actualiza el estado de la maquinaria a 3 (en reparación)
      const vehiculoActualizado = {
        ...vehiculos.find((v) => v.IdVehiculo === vehiculoId),
        IdEstado: 3, // Establecer el estado a 3 (en reparación)
      };

      await editVehiculos(vehiculoId, vehiculoActualizado);
      setMensaje("Estado de vehiculo actualizado a 'En Reparación'");

      setModalReparacion(false);
      fetchVehiculos(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      setMensaje("Error al agregar la reparación.");
      console.error("Error al agregar la reparación:", error);
    }
  };

  const handleChangeReparacion = (e) => {
    const { name, value } = e.target;
    setReparacionValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const title = [
    "Marca",
    "Modelo",
    "Año",
    "Color",
    "Tipo",
    "Fecha de Ultima Inspección",
    "Combustible",
    "Patente",
    "Numero de Identificación",
    "Estado",
    "Acciones",
  ];

  const columns = [
    { header: "Marca", dataKey: "Marca" },
    { header: "Modelo", dataKey: "Modelo" },
    { header: "Año", dataKey: "Año" },
    { header: "Color", dataKey: "Color" },
    { header: "Tipo", dataKey: "Tipo" },
    { header: "Fecha de Última Inspección", dataKey: "FechaUltimaInspeccion" },
    { header: "Combustible", dataKey: "Combustible" },
    { header: "Patente", dataKey: "NumeroPlaca"},
    { header: "Numero de Identificación", dataKey: "NumeroIdentificador" },
    { header: "Estado", dataKey: "IdEstado" },
  ];

  const rows = vehiculos.map((vehiculo) => ({
    Marca: vehiculo.Nombre,
    Modelo: vehiculo.Modelo,
    Año: vehiculo.Año,
    Color: vehiculo.Color,
    Tipo: vehiculo.Tipo,
    FechaUltimaInspeccion: vehiculo.FechaUltimaInspeccion
      ? vehiculo.FechaUltimaInspeccion.slice(0, 10)
      : "Fecha no disponible", // Manejo de fechas
    Combustible: vehiculo.Combustible,
    NumeroPlaca: vehiculo.NumeroPlaca,
    NumeroIdentificador: vehiculo.NumeroIdentificador,
    IdEstado: vehiculo.IdEstado,
  }));

  const fields = [
    {
      name: "Marca",
      label: "Marca",
      type: "text",
      placeholder: "Marca *",
    },
    {
      name: "Modelo",
      label: "Modelo",
      type: "text",
      placeholder: "Modelo *",
    },
    {
      name: "Año",
      label: "Año",
      type: "text",
      placeholder: "Año *",
    },
    {
      name: "Color",
      label: "Color",
      type: "text",
      placeholder: "Color *",
    },
    {
      name: "Tipo",
      label: "Tipo",
      type: "text",
      placeholder: "Tipo *",
    },
    {
      name: "FechaUltimaInspeccion",
      label: "Fecha de última inspección",
      type: "date",
      placeholder: "Fecha *",
    },
    {
      name: "Combustible",
      label: "Combustible",
      type: "text",
      placeholder: "Combustible *",
    },
    {
      name: "NumeroPlaca",
      label: "Patente",
      type: "text",
      placeholder: "Patente *",
    },
    {
      name: "NumeroIdentificador",
      label: "Numero de identificación",
      type: "text",
      placeholder: "Numero identificador *",
    },
    {
      name: "IdEstado",
      label: "Estado",
      type: "text",
      placeholder: "Estado *",
    },

  ];

  const estadoStyles = {
    1: "bg-green-100 text-green-800", // Operativa
    2: "bg-red-100 text-red-800", // Rota
    3: "bg-yellow-100 text-yellow-800bg-red-100 text-red-800", // En Reparación
  };

  const stateVehiculo = async () => {
    try {
      const response = await axios.get(`${BASE_URL_State}/ListarTodo`);
      setEstadoVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener estados de vehiculos:", error);
    }
  };
  useEffect(() => {
    stateVehiculo();
  }, []);

  const handleChangeState = async (vehiculo) => {
    const nuevoEstado = vehiculo.IdEstado === 1 ? 2 : 1; // Cambiar entre 1 y 2
    try {
      await editVehiculos(vehiculo.IdVehiculo, {
        ...vehiculo,
        IdEstado: nuevoEstado,
      });
      setMensaje("Estado cambiado exitosamente");
      await fetchVehiculos(); // Actualizar la lista
    } catch (error) {
      setMensaje("Error al cambiar el estado del vehículo.");
      console.error("Error al cambiar el estado:", error);
    }
  };

  const getNombreEstado = (id) => {
    const estado = EstadoVehiculos.find((estado) => estado.Id === id);
    return estado ? estado.Nombre : "Estado no disponible";
  };

  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Vehiculos</h2>
          <AddButtonWa abrirModal={abrirModal} title={" Añadir Vehiculo"} />
          <PdfGenerator
            columns={columns}
            data={vehiculos}
            title="Reporte de Vehiculos"
          />
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
          {modalAbierto && (
            <AddModal
              title="Agregar Vehiculo"
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}
          {modalEdit && (
            <ButtonEdit
              title="Modificar Vehículo"
              fields={fields}
              id={vehiculoId}
              formValues={formValues}
              handleChange={handleChange}
              handleEditSubmit={handleEditSubmit}
              cerrarModalEdit={cerrarModalEdit}
            />
          )}

          {modalReparacion && (
            <AddModal
              title="Agregar Reparación"
              fields={[
                {
                  name: "Detalle",
                  label: "Detalle",
                  type: "text",
                  placeholder: "Detalle *",
                },
                {
                  name: "FechaInicio",
                  label: "Fecha de Inicio",
                  type: "date",
                  placeholder: "Fecha *",
                },
                {
                  name: "IdEstadoReparacion",
                  label: "Estado",
                  type: "text",
                  placeholder: "Estado *",
                },
                {
                  name: "Costo",
                  label: "Costo",
                  type: "number",
                  placeholder: "Costo *",
                },
              ]}
              handleChange={handleChangeReparacion}
              handleSubmit={handleSubmitReparacion}
              cerrarModal={cerrarModalReparacion}
              values={reparacionValues}
            />
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <LoadingTable loading={loading} />
              <TablaHead titles={title} />
              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.Id} className="hover:bg-gray-100">
                    <td className="border-b py-2 px-4">{vehiculo.Marca}</td>
                    <td className="border-b py-2 px-4">{vehiculo.Modelo}</td>
                    <td className="border-b py-2 px-4">{vehiculo.Año}</td>
                    <td className="border-b py-2 px-4">{vehiculo.Color}</td>
                    <td className="border-b py-2 px-4">{vehiculo.Tipo}</td>
                    <td className="border-b py-2 px-4">
                      {vehiculo.FechaUltimaInspeccion}
                    </td>
                    <td className="border-b py-2 px-4">{vehiculo.Combustible}</td>
                    <td className="border-b py-2 px-4">{vehiculo.NumeroPlaca}</td>
                    <td className="border-b py-2 px-4">{vehiculo.NumeroIdentificador}</td>
                    <td
                      className={`border-b py-2 px-4 ${estadoStyles[vehiculo.IdEstado]}`}
                    >
                      {getNombreEstado(vehiculo.IdEstado)}
                    </td>
                    <td className="border-b py-2 px-4 flex justify-center">
                      {vehiculo.IdEstado === 3 ? (
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                          Ver Reparacion
                        </button>
                      ) : null}
                      <button
                        onClick={() => abrirModalEdit(vehiculo)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      {vehiculo.IdEstado === 1 ||
                      vehiculo.IdEstado === 2 ? (
                        <button
                          onClick={() => abrirModalReparacion(vehiculo.IdVehiculo)}
                          className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Agregar Reparación
                        </button>
                      ) : null}
                      {vehiculo.IdEstado === 1 ||
                      vehiculo.IdEstado === 2 ? (
                        <button
                          onClick={() => handleChangeState(vehiculo)}
                          className="bg-blue-500 text-white ml-2 py-1 px-3 rounded hover:bg-blue-700"
                        >
                          Cambiar Estado
                        </button>
                      ) : null}
                      <DeleteButton
                        id={vehiculo.Id}
                        endpoint={`${BASE_URL}/Borrar`}
                        updateList={fetchVehiculos}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehiculos;
