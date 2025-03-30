import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import { Toaster, toast } from 'sonner';
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import TableComponent from "../../components/TableComponent";
import DataView from "../../components/buttons/DataView";
import AddModal from "../../components/AddModal";
import { FiEdit, FiPlus, FiRefreshCw, FiEye } from "react-icons/fi";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import ModalReparacion from "../../components/ModalReparacion";
import LoadingTable from "../../components/LoadingTable";
import builderApiUrl from "../../utils/BuilderApi";
import axios from "axios";
import {
  getAllVehiculos,
  addVehiculos,
  editVehiculos,
  deleteVehiculos,
} from "../../api/VehiculosAPI";
import { addReparacion, editReparacion, getReparacionByIdVehiculo,} from "../../api/ReparacionesAPI";
import SectionLayout from "../../layout/SectionLayout";
import AddModalWithSelect from "../../components/AddModalWithSelect";

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [EstadoVehiculos, setEstadoVehiculos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [vehiculoId, setVehiculoId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalReparacion, setModalReparacion] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [modalDetallesReparacion, setModalDetallesReparacion] = useState(false);

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
    IdEstado: 1,
  });

  const [reparacionValues, setReparacionValues] = useState({
    IdMaquinaria: "",
    IdVehiculo: "",
    Detalle: "",
    FechaInicio: "",
    IdEstadoReparacion: 1,
    Costo: "",
  });

  const BASE_URL = ("http://www.ecotablasapi.somee.com/api/Vehiculos");
  const BASE_URL_State = ("http://www.ecotablasapi.somee.com/api/EstadosVehiculos");

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
      IdEstado: 1,

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
      IdEstado: 1,
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

  const abrirModalDetallesReparacion = async (vehiculo) => {
    try {
      const id = vehiculo.IdVehiculo;
      // Llama al servicio para obtener los datos por ID
      const response = await getReparacionByIdVehiculo(id);
      const reparacion = response.data;
  
      // Actualiza el estado con los valores obtenidos
      setReparacionValues({
        Id: reparacion.Id || "",
        IdVehiculo: reparacion.IdVehiculo || "",
        Detalle: reparacion.Detalle || "",
        FechaInicio: reparacion.FechaInicio || "",
        IdEstadoReparacion: reparacion.IdEstadoReparacion || 1,
        Costo: reparacion.Costo || "",
      });
  
      // Abre el modal
      setModalDetallesReparacion(true);
    } catch (error) {
      console.error("Error al obtener la reparación:", error);
      // Puedes mostrar una alerta o manejar el error de forma personalizada
    }
  };
  
  const cerrarModalDetallesReparacion = () => {
    setModalDetallesReparacion(false);
    // Opcional: Reinicia los valores del estado
    setReparacionValues({
      IdMaquinaria: "",
      IdVehiculo: "",
      Detalle: "",
      FechaInicio: "",
      IdEstadoReparacion: 1,
      Costo: "",
    });
  };


  const terminarReparacion = async () => {
    try {
      // Actualiza el estado de la reparación a 2 (terminada)
      await editReparacion(reparacionValues.Id, {
        ...reparacionValues,
        IdEstadoReparacion: 2,
      });
  
      const vehiculoActual = vehiculos.find(
        (v) => v.IdVehiculo === reparacionValues.IdVehiculo
      );
  
      if (!vehiculoActual) {
        throw new Error("No se encontró el vehiculo asociado a esta reparación.");
      }
  
      // Actualiza el estado de la maquinaria a 1
      await editVehiculos(reparacionValues.IdVehiculo, {
        ...vehiculoActual,
        IdEstado: 1, // Estado de maquinaria disponible
      });
      // Opcional: actualiza la UI si es necesario
      setReparacionValues((prev) => ({
        ...prev,
        IdEstadoReparacion: 2,
      }));
  
      toast.success("La reparación ha sido marcada como terminada.");
      await fetchVehiculos(); // Actualiza la lista
      setModalDetallesReparacion(false); // Cierra el modal después de la acción
    } catch (error) {
      console.error("Error al terminar la reparación:", error);
      alert("Ocurrió un error al marcar la reparación como terminada.");
    }
  };

  const fetchVehiculos = async () => {
    setLoading(true);
    try {
      const res = await getAllVehiculos(); // Usar la función de API para obtener los datos
      setVehiculos(res.data); // Actualizar el estado con la respuesta
    } catch (error) {
      toast.error("Error al cargar los vehiculos.");
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
      toast.error("La marca es obligatoria.");
      isValid = false;
    } else if (!formValues.Modelo) {
      toast.error("Modelo es obligatorio.");
      isValid = false;
    } else if (!formValues.Año) {
      toast.error("Año es obligatorio.");
      isValid = false;
    } else if (!formValues.Color) {
      toast.error("Color es obligatorio.");
      isValid = false;
    } else if (!formValues.Tipo) {
      toast.error("Tipo es obligatorio.");
      isValid = false;
    } else if (!formValues.FechaUltimaInspeccion) {
      toast.error("Fecha es obligatoria.");
      isValid = false;
    } else if (!formValues.Combustible) {
      toast.error("Combustible es obligatorio.");
      isValid = false;
    } else if (!formValues.NumeroPlaca) {
      toast.error("Numero Placa es obligatorio.");
      isValid = false;
    } else if (!formValues.NumeroIdentificador) {
      toast.error("Numero es obligatorio.");
      isValid = false;
    } else if (!formValues.IdEstado) {
      toast.error("Estado es obligatorio.");
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

        toast.success("Inserción exitosa");
      } else {
        toast.error("Error: no se recibió un dato válido de la API.");
      }

      setModalAbierto(false);
    } catch (error) {
      toast.error("Error al agregar el vehículo.");
      console.error("Error al agregar el vehículo:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await editVehiculos(vehiculoId, formValues);
      setModalEdit(false);
      toast.success("Modificación exitosa");
      await fetchVehiculos(); // Actualiza la lista
    } catch (error) {
      toast.error("Error al modificar el vehículo.");
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
      toast.error("El detalle es obligatorio.");
      isValid = false;
    } else if (!reparacionValues.FechaInicio) {
      toast.error("La fecha de inicio es obligatoria.");
      isValid = false;
    } else if (!reparacionValues.IdEstadoReparacion) {
      toast.error("El estado de la reparación es obligatorio.");
      isValid = false;
    } else if (!reparacionValues.Costo) {
      toast.error("El costo es obligatorio.");
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
      toast.success("Reparación agregada exitosamente");

      // Luego, actualiza el estado de la maquinaria a 3 (en reparación)
      const vehiculoActualizado = {
        ...vehiculos.find((v) => v.IdVehiculo === vehiculoId),
        IdEstado: 3, // Establecer el estado a 3 (en reparación)
      };

      await editVehiculos(vehiculoId, vehiculoActualizado);
      toast.success("Estado de vehiculo actualizado a 'En Reparación'");

      setModalReparacion(false);
      fetchVehiculos(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al agregar la reparación.");
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
    // "Fecha de Ultima Inspección",
    // "Combustible",
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
    { header: "Combustible", dataKey: "Combustible" },
    { header: "Patente", dataKey: "NumeroPlaca"},
    { header: "Numero de Identificación", dataKey: "NumeroIdentificador" },
    { header: "Estado", dataKey: "IdEstado" },
    { header: "Fecha de Última Inspección", dataKey: "FechaUltimaInspeccion" },
  ];

  const rows = vehiculos.map((vehiculo) => ({
    Marca: vehiculo.Nombre,
    Modelo: vehiculo.Modelo,
    Año: vehiculo.Año,
    Color: vehiculo.Color,
    Tipo: vehiculo.Tipo,
    Combustible: vehiculo.Combustible,
    NumeroPlaca: vehiculo.NumeroPlaca,
    NumeroIdentificador: vehiculo.NumeroIdentificador,
    IdEstado: vehiculo.IdEstado,
    FechaUltimaInspeccion: vehiculo.FechaUltimaInspeccion
    ? vehiculo.FechaUltimaInspeccion.slice(0, 10)
    : "Fecha no disponible", // Manejo de fechas
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
      name: "FechaUltimaInspeccion",
      label: "Fecha de última inspección",
      type: "date",
      placeholder: "Fecha *",
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

  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });
  const [data, setData] = useState(vehiculos);
 
  useEffect(() => {
    setData(vehiculos);
  }, [vehiculos]);


  const handleSort = (campo) => {
 
    let direction = "asc";
    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }
  
    const sortedData = [...vehiculos].sort((a, b) => {
      if (a[campo] < b[campo]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[campo] > b[campo]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    setData(sortedData);
    setSortConfig({ campo, direction });
  };
  const handleChangeState = async (vehiculo) => {
    const nuevoEstado = vehiculo.IdEstado === 1 ? 2 : 1; // Cambiar entre 1 y 2
    try {
      await editVehiculos(vehiculo.IdVehiculo, {
        ...vehiculo,
        IdEstado: nuevoEstado,
      });
      toast.success("Estado cambiado exitosamente");
      await fetchVehiculos(); // Actualizar la lista
    } catch (error) {
      toast.error("Error al cambiar el estado del vehículo.");
      console.error("Error al cambiar el estado:", error);
    }
  };

  const getNombreEstado = (id) => {
    const estado = EstadoVehiculos.find((estado) => estado.Id === id);
    return estado ? estado.Nombre : "Estado no disponible";
  };

  const titlesT = [
    { label: "Marca", key: "Marca", type: "text" },
    { label: "Modelo", key: "Modelo", type: "text" },
    { label: "Año", key: "Año", type: "text" },
    { label: "Color", key: "Color", type: "text" },
    { label: "Tipo", key: "Tipo", type: "text" },
    { label: "Combustible", key: "Combustible", type: "text" },
    { label: "Patente", key: "NumeroPlaca", type: "text" },
    { label: "Numero de Identificación", key: "NumeroIdentificador", type: "text" },
    { 
      label: "Estado", 
      key: "IdEstado", 
      render: (value) => (
<td
         className={`border-b py-2 px-4 full text-center ${estadoStyles[value]} `}>
          
          {getNombreEstado(value)
          }
        </td>
      ),
    },
    { label: "Fecha de última inspección", key: "FechaUltimaInspeccion", type: "date", hasActions: true },
  ];

  const actions = [
    {
      allowedRoles: ["admin","supervisor", ],
      render: (vehiculo) => (
        <td className="border-b flex flex-row justify-center gap-1">
                     {vehiculo.IdEstado === 3 && (
                        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
          onClick={() => abrirModalDetallesReparacion(vehiculo)}
        >
          <FiEye />
          Ver Reparaciones
       </button>
                      )}
                      
                      <button
                        onClick={() => abrirModalEdit(vehiculo)}
                        className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                      >
                        <FiEdit />
                        Modificar
                      </button>
                      
                      {(vehiculo.IdEstado === 1 || vehiculo.IdEstado === 2) && (
                        <button
                          onClick={() => abrirModalReparacion(vehiculo.IdVehiculo)}
                          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                        >
                          <FiPlus />
                          Agregar Reparación
                        </button>
                      )}
                      

                      {(vehiculo.IdEstado === 1 || vehiculo.IdEstado === 2) && (
                        <button
                          onClick={() => handleChangeState(vehiculo)}
                          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded flex items-center gap-1"
                        >
                          <FiRefreshCw />
                          Cambiar Estado
                        </button>
                      )}
                      
                      <DeleteButton
                        id={vehiculo.IdVehiculo}
                        endpoint={`${BASE_URL}/Delete`}
                        updateList={fetchVehiculos}
                      />
                    </td>

      ),
    },
  ];
  

  return (
    <>
    <SectionLayout title="Vehiculos">
    <Toaster />
        <div className="p-4 w-full">
          
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
            <AddModalWithSelect
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
            <AddModalWithSelect
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
          {modalDetallesReparacion && (
        <ModalReparacion
          title="Detalles de Reparación"
          content={
            reparacionValues ? (
              <div>
                <p><strong>Detalle:</strong> {reparacionValues.Detalle}</p>
                <p><strong>Fecha de Inicio:</strong> {reparacionValues.FechaInicio}</p>
                <p><strong>Costo:</strong> {reparacionValues.Costo}</p>
                <button onClick={terminarReparacion} 
                className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              Terminar Reparación
            </button>
              </div>
            ) : (
              <p>No hay información disponible sobre esta reparación.</p>
            )
          }
          cerrarModal={cerrarModalDetallesReparacion}
        />
      )}
          <div className="overflow-x-auto">
            {/* <table className="min-w-full bg-white rounded-lg shadow-md">
              <LoadingTable loading={loading} />
              <TablaHead titles={title} />
              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.Id} className="hover:bg-gray-100">
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Marca: </span>
    {vehiculo.Marca}
  </td>
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Modelo: </span>
    {vehiculo.Modelo}
  </td>
  <td className="border-b py-2 px-4 text-right">
    <span className="font-semibold lg:hidden">Año: </span>
    {vehiculo.Año}
  </td>
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Color: </span>
    {vehiculo.Color}
  </td>
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Tipo: </span>
    {vehiculo.Tipo}
  </td>

<td className="border-b py-2 px-4 text-right whitespace-nowrap">
  <span className="font-normal"> </span>
  {vehiculo.NumeroPlaca}
</td>

  <td className="border-b  py-2 px-4 text-right">
    <span className="font-semibold lg:hidden">Número Identificador: </span>
    {vehiculo.NumeroIdentificador}
  </td>
  <td
    className={`border-b py-2 px-4 text-left ${estadoStyles[vehiculo.IdEstado]}`}
  >
    <span className="font-semibold lg:hidden">Estado: </span>
    {getNombreEstado(vehiculo.IdEstado)}
  </td>
  <td className="border-b py-2 px-4 flex justify-center">
                      {vehiculo.IdEstado === 3 ? (
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center gap-2">
                          <FiEye />
                          Ver Reparacion
                        </button>
                      ) : null}
                      <button
                        onClick={() => abrirModalEdit(vehiculo)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                      >
                        <FiEdit />
                        Modificar
                      </button>
                      {vehiculo.IdEstado === 1 ||
                      vehiculo.IdEstado === 2 ? (
                        <button
                          onClick={() => abrirModalReparacion(vehiculo.IdVehiculo)}
                          className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                        >
                          <FiPlus />
                          Agregar Reparación
                        </button>
                      ) : null}
                      {vehiculo.IdEstado === 1 ||
                      vehiculo.IdEstado === 2 ? (
                        <button
                          onClick={() => handleChangeState(vehiculo)}
                          className="bg-blue-500 text-white ml-2 py-1 px-3 rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                          <FiRefreshCw />
                          Cambiar Estado
                        </button>
                      ) : null}
                      <DeleteButton
                        id={vehiculo.IdVehiculo}
                        endpoint={`${BASE_URL}/Delete`}
                        updateList={fetchVehiculos}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            <TableComponent
data={data}
titles={titlesT}
sortConfig={sortConfig}
onSort={handleSort}
actions={actions}
hasMaterial={true}
/>
          </div>
        </div>
    
    </SectionLayout>
    </>
  );
};

export default Vehiculos;
