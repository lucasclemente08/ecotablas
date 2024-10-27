import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButton from "../../components/buttons/AddButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import LoadingTable from "../../components/LoadingTable";
import builderApiUrl from "../../utils/BuilderApi";
import axios from "axios";
import {
  getAllMaquinarias,
  addMaquinarias,
  editMaquinarias,
  deleteMaquinarias,
} from "../../api/MaquinariasAPI";
import { addReparacion } from "../../api/ReparacionesAPI";

const Maquinaria = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [EstadoMaquinarias, setEstadoMaquinarias] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [maquinariaId, setMaquinariaId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalReparacion, setModalReparacion] = useState(false);
  
  const [mensaje, setMensaje] = useState("");

  const [formValues, setFormValues] = useState({
    Nombre: "",
    Tipo: "",
    Modelo: "",
    IdEstado: "",
    fecha_adquisicion: "",
  });

  const [reparacionValues, setReparacionValues] = useState({
    IdMaquinaria: "",
    IdVehiculo: "",
    Detalle: "",
    FechaInicio: "",
    IdEstadoReparacion: "",
    Costo: "",
  });

  const BASE_URL = builderApiUrl("Maquinaria");
  const BASE_URL_State = builderApiUrl("EstadosMaquinarias");

  const abrirModalEdit = (maquinaria) => {
    setMaquinariaId(maquinaria.Id);
    setFormValues({
      Nombre: maquinaria.Nombre,
      Tipo: maquinaria.Tipo,
      Modelo: maquinaria.Modelo,
      IdEstado: maquinaria.IdEstado,
      fecha_adquisicion: maquinaria.fecha_adquisicion
        ? maquinaria.fecha_adquisicion.slice(0, 10)
        : "",
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const abrirModal = () => {
    setFormValues({
      Nombre: "",
      Tipo: "",
      Modelo: "",
      IdEstado: "",
      fecha_adquisicion: "",
    }); // Reiniciar los valores del formulario
    setModalAbierto(true);
  };
  const cerrarModal = () => setModalAbierto(false);
  const abrirModalReparacion = (id) => {
    setMaquinariaId(id);
    setReparacionValues({ ...reparacionValues, IdMaquinaria: id });
    setModalReparacion(true);
  };
  const cerrarModalReparacion = () => setModalReparacion(false);

  const fetchMaquinarias = async () => {
    setLoading(true);
    try {
      const res = await getAllMaquinarias(); // Usar la función de API para obtener los datos
      setMaquinarias(res.data); // Actualizar el estado con la respuesta
    } catch (error) {
      setMensaje("Error al cargar las maquinarias.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaquinarias();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!formValues.Nombre) {
      setMensaje("Nombre es obligatorio.");
      isValid = false;
    } else if (!formValues.Tipo) {
      setMensaje("Tipo es obligatorio.");
      isValid = false;
    } else if (!formValues.Modelo) {
      setMensaje("Modelo es obligatorio.");
      isValid = false;
    } else if (!formValues.IdEstado) {
      setMensaje("Estado es obligatorio.");
      isValid = false;
    } else if (!formValues.fecha_adquisicion) {
      setMensaje("Fecha de adquisición es obligatoria.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    try {
      const response = await axios.post(`${BASE_URL}/Insertar`, formValues);
      if (response) {
        await fetchMaquinarias(); 


        setMensaje("Inserción exitosa");
      } else {
        setMensaje("Error: no se recibió un dato válido de la API.");
      }
  
      setModalAbierto(false);
    } catch (error) {
      setMensaje("Error al agregar la maquinaria.");
      console.error("Error al agregar la maquinaria:", error);
    }
  };
  

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    try {
      await editMaquinarias(maquinariaId, formValues);
      setModalEdit(false);
      setMensaje("Modificación exitosa");
      await fetchMaquinarias(); // Actualiza la lista
    } catch (error) {
      setMensaje("Error al modificar la maquinaria.");
      console.error("Error al modificar la maquinaria:", error);
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
      await addReparacion(reparacionValues);
      setMensaje("Reparación agregada exitosamente");
      setModalReparacion(false);
      fetchMaquinarias(); // Refrescar la lista para mostrar cambios
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

  const title = ["Nombre", "Tipo", "Modelo", "Estado", "Fecha de adquisición", "Acciones"];

  const columns = [
    { header: "Nombre", dataKey: "Nombre" },
    { header: "Tipo", dataKey: "Tipo" },
    { header: "Modelo", dataKey: "Modelo" },
    { header: "Estado", dataKey: "IdEstado" },
    { header: "Fecha de adquisición", dataKey: "fecha_adquisicion" },
  ];

  const rows = maquinarias.map((maquinaria) => ({
    Nombre: maquinaria.Nombre,
    Tipo: maquinaria.Tipo,
    Modelo: maquinaria.Modelo,
    IdEstado: maquinaria.IdEstado,
    fecha_adquisicion: maquinaria.fecha_adquisicion
      ? maquinaria.fecha_adquisicion.slice(0, 10)
      : "Fecha no disponible", // Manejo de fechas
  }));

  const fields = [
    {
      name: "Nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre *",
    },
    {
      name: "Tipo",
      label: "Tipo",
      type: "text",
      placeholder: "Tipo *",
    },
    {
      name: "Modelo",
      label: "Modelo",
      type: "text",
      placeholder: "Modelo *",
    },
    {
      name: "IdEstado",
      label: "Estado",
      type: "text",
      placeholder: "Estado *",
    },
    {
      name: "fecha_adquisicion",
      label: "Fecha de adquisición",
      type: "date",
      placeholder: "Fecha *",
    },
  ];

  const estadoStyles = {
    1: "bg-green-100 text-green-800", // Operativa
    2: "bg-red-100 text-red-800", // Rota
    3: "bg-yellow-100 text-yellow-800", // En Reparación
  };

  const stateMaquinaria = async () => {
    try {
      const response = await axios.get(`${BASE_URL_State}/ListarTodo`);
      setEstadoMaquinarias(response.data);
    } catch (error) {
      console.error("Error al obtener estados de maquinarias:", error);
    
    }
  };
useEffect(() => {
    stateMaquinaria();
  }, []);

  const getNombreEstado = (id) => {
    const estado = EstadoMaquinarias.find((estado) => estado.Id === id);
    return estado ? estado.Nombre : "Estado no disponible";
  };


  return (
    <>
      <div className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Maquinarias</h2>
          <AddButton abrirModal={abrirModal} title={" Añadir Maquinaria"} />
          <PdfGenerator columns={columns} data={maquinarias} title="Reporte de Maquinarias" />
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}
          {modalAbierto && (
            <AddModal
              title="Agregar Maquinaria"
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}
          {modalEdit && (
            <ButtonEdit
              title="Modificar Maquinaria"
              fields={fields}
              id={maquinariaId}
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
                { name: "IdVehiculo", label: "Vehículo", type: "text", placeholder: "ID Vehículo" },
                { name: "Detalle", label: "Detalle", type: "text", placeholder: "Detalle *" },
                { name: "FechaInicio", label: "Fecha de Inicio", type: "date", placeholder: "Fecha *" },
                { name: "IdEstadoReparacion", label: "Estado", type: "text", placeholder: "Estado *" },
                { name: "Costo", label: "Costo", type: "number", placeholder: "Costo *" }
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
                {maquinarias.map((maquinaria) => (
                  <tr key={maquinaria.Id} className="hover:bg-gray-100">
                    <td className="border-b py-2 px-4">{maquinaria.Nombre}</td>
                    <td className="border-b py-2 px-4">{maquinaria.Tipo}</td>
                    <td className="border-b py-2 px-4">{maquinaria.Modelo}</td>
                    <td className={`border-b py-2 px-4 ${estadoStyles[maquinaria.IdEstado]}`}>
                      {getNombreEstado(maquinaria.IdEstado)}
                    </td>
                    <td className="border-b py-2 px-4">{maquinaria.fecha_adquisicion}</td>
                    <td className="border-b py-2 px-4 flex justify-center">
                      <button
                        onClick={() => abrirModalEdit(maquinaria)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => abrirModalReparacion(maquinaria.Id)}
                        className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Agregar Reparación
                      </button>
                      <DeleteButton
                        id={maquinaria.Id}
                        endpoint={`${BASE_URL}/Borrar`}
                        updateList={fetchMaquinarias}
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

export default Maquinaria;
