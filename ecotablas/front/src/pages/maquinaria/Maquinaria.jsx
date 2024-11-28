import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import { FaChartPie } from "react-icons/fa";
import DataView from "../../components/buttons/DataView";
import LoadingTable from "../../components/LoadingTable";
import builderApiUrl from "../../utils/BuilderApi";
import { FiEdit, FiPlus, FiRefreshCw, FiEye } from "react-icons/fi";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import axios from "axios";
import {
  getAllMaquinarias,
  addMaquinarias,
  editMaquinarias,
  deleteMaquinarias,
} from "../../api/MaquinariasAPI";
import { addReparacion, editReparacion, getReparacionByIdMaquinaria, } from "../../api/ReparacionesAPI";

import MaquinariaChart from "../../components/graficos/MaquinariaChart";

const Maquinaria = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [EstadoMaquinarias, setEstadoMaquinarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [maquinariaId, setMaquinariaId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalReparacion, setModalReparacion] = useState(false);
  const [reparaciones, setReparaciones] = useState([]);
  const [modalReparacionList, setModalReparacionList] = useState(false);
const [showPieChart, setShowPieChart] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showTable, setShowTable] = useState(true);

  const [formValues, setFormValues] = useState({
    Nombre: "",
    Tipo: "",
    Modelo: "",
    IdEstado: 1,
    fecha_adquisicion: "",
  });

  const [reparacionValues, setReparacionValues] = useState({
    IdMaquinaria: "",
    IdVehiculo: "",
    Detalle: "",
    FechaInicio: "",
    IdEstadoReparacion: 1,
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
      IdEstado: 1,
      fecha_adquisicion: maquinaria.fecha_adquisicion
        ? maquinaria.fecha_adquisicion.slice(0, 10)
        : "",
    });
    setModalEdit(true);
  };

  const fetchReparaciones = async (maquinaria) => {
    setLoading(true);
    try {
      const res = await getReparacionByIdMaquinaria(maquinaria.Id);
      setReparaciones(res.data);
    } catch (error) {
      toast.error("Error al cargar las reparaciones.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };
  const abrirModalReparacionList = (maquinaria) => {
    setMaquinariaId(maquinaria.Id);
    fetchReparaciones(maquinaria.Id);
    setModalReparacionList(true);
  };
  const cerrarModalReparacionList = () => {
    setModalReparacionList(false);
    setReparaciones([]);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const abrirModal = () => {
    setFormValues({
      Nombre: "",
      Tipo: "",
      Modelo: "",
      IdEstado: 1,
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
      toast.error("Error al cargar las maquinarias.");
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
      toast.error("Nombre es obligatorio.");
      isValid = false;
    } else if (!formValues.Tipo) {
      toast.error("Tipo es obligatorio.");
      isValid = false;
    } else if (!formValues.Modelo) {
      toast.error("Modelo es obligatorio.");
      isValid = false;
    } else if (!formValues.fecha_adquisicion) {
      toast.error("Fecha de adquisición es obligatoria.");
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
        
        toast.success("Inserción exitosa");
      } else {
        toast.error("Error: no se recibió un dato válido de la API.");
      }

      setModalAbierto(false);
    } catch (error) {
      toast.error("Error al agregar la maquinaria.");
      console.error("Error al agregar la maquinaria:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    try {
      await editMaquinarias(maquinariaId, formValues);
      setModalEdit(false);
      toast.success("Modificación exitosa");
      await fetchMaquinarias(); // Actualiza la lista
    } catch (error) {
      toast.error("Error al modificar la maquinaria.");
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
      toast.error("El detalle es obligatorio.");
      isValid = false;
    } else if (!reparacionValues.FechaInicio) {
      toast.error("La fecha de inicio es obligatoria.");
      isValid = false;
    }  else if (!reparacionValues.Costo) {
      toast.error("El costo es obligatorio.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmitReparacion = async () => {
    if (!validateReparacionForm()) return;

    try {

      await addReparacion(reparacionValues);
      toast.success("Reparación agregada exitosamente");

      // Luego, actualiza el estado de la maquinaria a 3 (en reparación)
      const maquinariaActualizada = {
        ...maquinarias.find((m) => m.Id === maquinariaId),
        IdEstado: 3, 
      };

      await editMaquinarias(maquinariaId, maquinariaActualizada);
      toast.success("Estado de maquinaria actualizado a 'En Reparación'");

      setModalReparacion(false);
      fetchMaquinarias(); // Refrescar la lista para mostrar cambios
    } catch (error) {
      toast.error("Error al agregar la reparación.");
      console.error("Error al agregar la reparación:", error);
    }
  };
  const terminarReparacion = async (reparacionId) => {
    try {
      // Editar estado de la reparación a 2 (terminada)
      await editReparacion(reparacionId, { IdEstadoReparacion: 2 });

      // Cambiar estado de la maquinaria a 1 (operativa)
      await editMaquinarias(maquinariaId, { IdEstado: 1 });

      toast.success("Reparación terminada y maquinaria marcada como operativa.");
      fetchReparaciones(maquinariaId);
      fetchMaquinarias(); // Refrescar maquinarias
    } catch (error) {
      toast.error("Error al terminar la reparación.");
      console.error("Error al terminar la reparación: ", error);
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
    "Nombre",
    "Tipo",
    "Modelo",
    "Estado",
    "Fecha de adquisición",
    "Acciones",
  ];

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

  const handleChangeState = async (maquinaria) => {
    const nuevoEstado = maquinaria.IdEstado === 1 ? 2 : 1; // Cambiar entre 1 y 2
    try {
      await editMaquinarias(maquinaria.Id, {
        ...maquinaria,
        IdEstado: nuevoEstado,
      });
      toast.success("Estado cambiado exitosamente");
      await fetchMaquinarias(); // Actualizar la lista
    } catch (error) {
      toast.error("Error al cambiar el estado de la maquinaria.");
      toast.success("Error al cambiar el estado de la maquinaria.");
      console.error("Error al cambiar el estado:", error);
    }
  };

  const getNombreEstado = (id) => {
    const estado = EstadoMaquinarias.find((estado) => estado.Id === id);
    return estado ? estado.Nombre : "Estado no disponible";
  };



  const handleShowTable = () => {
    setShowTable(true);
    setShowPieChart(false);
  };
  

  return (
    <>
    <div className="md:flex flex-row bg-slate-900 min-h-screen">
      <Home />
      <div className="p-4 w-full">

        <h2 className="text-2xl font-bold text-white mb-4">Maquinarias</h2>
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>


        <div className=" flex">

        <AddButtonWa abrirModal={abrirModal} title={" Añadir Maquinaria"} />
        <PdfGenerator
          columns={columns}
          data={maquinarias}
          title="Reporte de Maquinarias"
          />
          <AddButtonWa abrirModal={abrirModal} title={" Añadir Maquinaria"} />
          <PdfGenerator
            columns={columns}
            data={maquinarias}
            title="Reporte de Maquinarias"
            />

<DataView ShowTable={handleShowTable} />

<button
          aria-label="Ver gráfico circular"
          className={`p-2  ml-2 mt-2 mb-5 font-bold rounded flex items-center text-white ${showPieChart ? "bg-blue-600" : "bg-gray-500"}`}
          onClick={() => {
            setShowPieChart(true);
            setShowTable(false);
          }}
        >
          Ver Gráfico Circular <FaChartPie className="ml-2" />
        </button>

            </div>

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
          <div className="overflow-x-auto">
           {showTable ? (
             <table className="min-w-full bg-white rounded-lg shadow-md">
             <LoadingTable loading={loading} />
             <TablaHead titles={title} />
             <tbody>


      
               {maquinarias.map((maquinaria) => (
<tr key={maquinaria.Id} className="hover:bg-gray-100">
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Nombre: </span>
    {maquinaria.Nombre}
  </td>
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Tipo: </span>
    {maquinaria.Tipo}
  </td>
  <td className="border-b py-2 px-4 text-left">
    <span className="font-semibold lg:hidden">Modelo: </span>
    {maquinaria.Modelo}
  </td>
  <td className={`border-b py-2 px-4 text-left ${estadoStyles[maquinaria.IdEstado]}`}>
    <span className="font-semibold lg:hidden">Estado: </span>
    {getNombreEstado(maquinaria.IdEstado)}
  </td>
  <td className="border-b py-2 px-4 text-right">
    <span className="font-semibold lg:hidden">Fecha de Adquisición: </span>
    {maquinaria.fecha_adquisicion}
  </td>
  <td className="border-b py-2 px-4 flex justify-center">
                
      {maquinaria.IdEstado === 3 ? (
        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 flex items-center gap-2">
          <FiEye />
          Ver Reparación
        </button>
      ) : null}

      <button
        onClick={() => abrirModalEdit(maquinaria)}
        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
      >
        <FiEdit />
        Modificar
      </button>

      {(maquinaria.IdEstado === 1 || maquinaria.IdEstado === 2) && (
        <button
          onClick={() => abrirModalReparacion(maquinaria.Id)}
          className="bg-green-700 ml-2 hover:bg-green-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <FiPlus />
          Agregar Reparación
        </button>
      )}

      {(maquinaria.IdEstado === 1 || maquinaria.IdEstado === 2) && (
        <button
          onClick={() => handleChangeState(maquinaria)}
          className="bg-blue-500 text-white ml-2 py-1 px-3 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FiRefreshCw />
          Cambiar Estado
        </button>
      )}
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
           ):(
           <div>

           <MaquinariaChart />
           </div>   
           )
           }
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Maquinaria;
