import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTablasProducidas,
  addTablaProducida,
  editTablaProducida,
  deleteTablaProducida,
} from "../../features/tablasProducidasSlice";
import SectionLayout from "../../layout/SectionLayout";
import AddButtonWa from "../../components/buttons/AddButtonWa";
import { BsClipboardDataFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import { GrLinkNext } from "react-icons/gr";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModalWithSelect from "../../components/AddModalWithSelect";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import NextButton from "../../components/buttons/NextButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editTablas, } from "../../api/TablasProducidaAPI";
import { v4 as uuidv4 } from "uuid";

const TablasProducidas = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.tablasProducidas,
  );
  const [selectedDate, setSelectedDate] = useState("");  // Store the selected date
  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentItems, setCurrentItems] = useState([])
  const [tablaId, setTablaId] = useState(null);
  
  const [formValues, setFormValues] = useState({
    FechaProduccion: "",
    Dimensiones: "",
    Peso: "",
    CodigoIdentificacion: "",
    Estado: 1,
    IdTolva: "",
  });

  const columns = [
    { header: "Fecha Producción", accessor: "FechaProduccion" },
    { header: "Dimensiones", accessor: "Dimensiones" },
    { header: "Peso (kgs)", accessor: "Peso" },
    { header: "Código Identificación", accessor: "CodigoIdentificacion" },
  ];

  const titles = [...columns.map((col) => col.header), "Acciones"];

  useEffect(() => {
    dispatch(fetchTablasProducidas());
  }, [dispatch]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (tabla) => {
    setTablaId(tabla.ID_Tabla);
    setFormValues({
      FechaProduccion: tabla.FechaProduccion,
      Dimensiones: tabla.Dimensiones,
      Peso: tabla.Peso,
      CodigoIdentificacion: tabla.CodigoIdentificacion,
      Estado: 1,
      IdTolva: tabla.IdTolva,
    });
    setModalEdit(true);
  };
  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormValues = {
      ...formValues,
      CodigoIdentificacion: GenerateIdentificationCode(
        formValues.Dimensiones,
        formValues.Peso,
      ),
    };

    await dispatch(addTablaProducida(newFormValues));
    toast.success("Tabla añadida con éxito!");
    await dispatch(fetchTablasProducidas());
    cerrarModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editTablas({ tablaId, formValues });
    toast.success("Registro editado con éxito!");
    cerrarModalEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [data, currentPage]);

  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPeso = data.reduce(
    (acc, tabla) => acc + parseFloat(tabla.Peso || 0),
    0,
  );
  const totalItems = data.length;

  const dimensionesOptions = [
    { value: "1,50mts x 10cm", label: "1,50mts x 10cm" },
    { value: "1,60mts x 10cm", label: "1,60mts x 10cm" },
  ];

  const GenerateIdentificationCode = (size, large) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const codeUID = uuidv4().replace(/-/g, "").slice(0, 8);
    return `$${size}_${large}_${hours}_${codeUID}`;
  };
  const handleChangeState = async (item) => {
    try {
      await editTablas(item.ID_Tabla, {
        ...item,
        Estado: 2, // Cambiar siempre a 2
      });
      toast.success("¡Tabla terminada!");
      dispatch(fetchTablasProducidas()); // Actualizar la lista
    } catch (error) {
      toast.error("Error al cambiar el estado de las tablas.");
      console.error("Error al cambiar el estado:", error);
    }
  };
  
  const filterByDate = () => {
    const selectedDateObj = new Date(selectedDate);
    const filteredItems = data.filter((item) => {
      const itemDate = new Date(item.FechaProduccion);
      return itemDate.toISOString().slice(0, 10) === selectedDateObj.toISOString().slice(0, 10);
    });

    setCurrentItems(filteredItems);  // Update displayed items
  };



  return (
    <SectionLayout title="Tablas Producidas">
      <div className="flex items-center">



      <AddButtonWa abrirModal={abrirModal} title="Añadir tabla" />


      <PdfGenerator
        columns={columns}
        data={data}
        title="Reporte de Tablas Producidas"
      />

      <div className=" flex items-center justify-center">
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}  // Update the selected date state
        className="mb-2 p-2 border border-gray-300 rounded"
      />


      <button 
        onClick={filterByDate}  // Trigger the filter when clicked
        className="p-3    ml-2 bg-blue-500 text-white rounded"
      >
        Buscar por fecha
      </button>
      {/* <button 
        onClick={setCurrentItems(data)}  // Trigger the filter when clicked
        className="p-3   ml-2 bg-slate-400 text-white rounded"
      >
        Limpiar busqueda
      </button> */}
    </div>
    </div>
      {error && (
        <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">
          Error: {error}
        </div>
      )}

{mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}

      {modalAbierto && (
        <AddModalWithSelect
          title="Agregar Tabla Producida"
          fields={[
            {
              name: "FechaProduccion",
              label: "Fecha Producción",
              type: "date",
            },
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso (kgs)", type: "number" },
            { name: "IdTolva", label: "IdTolva", type: "number" },
          ]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrarModal={cerrarModal}
          values={formValues}
        />
      )}
      {modalEdit && (
        <ButtonEdit
          title="Editar Tabla Producida"
          fields={[
            {
              name: "Dimensiones",
              label: "Dimensiones",
              type: "select",
              options: dimensionesOptions,
            },
            { name: "Peso", label: "Peso (kgs)", type: "number" },
          ]}
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleEditSubmit}
          cerrarModal={cerrarModalEdit}
        />
      )}

      {loading ? (
        <LoadingTable />
      ) : (
        <>
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <TablaHead titles={titles} />
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.ID_Tabla}>
  <td className="px-4 py-2 text-left">
    {item.FechaProduccion ? item.FechaProduccion.slice(0, 10) : "Fecha no disponible"}
  </td>
  <td className="px-4 py-2 text-left">{item.Dimensiones}</td>
  <td className="px-4 py-2 text-right">{item.Peso}</td>
  <td className="px-4 py-2 text-right">{item.CodigoIdentificacion}</td>
  <td className="px-4 py-2 flex justify-center">
                  <button
                          onClick={() => handleChangeState(item)}
                          className="bg-green-600 ml-2 hover:bg-green-800 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >

                        <GrLinkNext />
                          Terminado
                        </button>
                    <button
                      onClick={() => abrirModalEdit(item)}
                      className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      <FiEdit />
                      Modificar
                    </button>
                    <DeleteButton
                      id={item.ID_Tabla}
                      endpoint={
                        "http://www.gestiondeecotablas.somee.com/api/TablaProducidas/Borrar"
                      }
                      updateList={() => dispatch(fetchTablasProducidas())}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center bg-gray-700">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2  ml-2 hover:text-gray-400 text-white rounded-l"
            >
              Anterior
            </button>
            <span className="text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 hover:text-gray-400  text-white rounded-r"
            >
              Siguiente
            </button>
          </div>
          <div className="mt-4 text-white">
            <p>Total Peso: {totalPeso} kg</p>
            <p>Total de Items: {totalItems}</p>
          </div>
        </>
      )}
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
    </SectionLayout>
  );
};

export default TablasProducidas;
