import React, { useState, useEffect } from "react";
import SectionLayout from "../../layout/SectionLayout";
import AddButton from "../../components/buttons/addButton";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEdit";
import NextButton from "../../components/buttons/NextButton";
import ReportButton from "../../components/buttons/ReportButton";
import Modal from "../../components/modal";



const Tolva = () => {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [materialId, setMaterialId] = useState(null);


  const [formValues, setFormValues] = useState({
    startTime: "",
    cantidadCargada: "",
    tipoPlastico: "unico",
    proporcion: "",
    especificaciones: "",
  });

  // Columnas para PdfGenerator y TablaHead
  const columns = [
    { header: "Horario de inicio", accessor: "startTime" },
    { header: "Cantidad cargada (kg)", accessor: "cantidadCargada" },
    { header: "Tipo de plástico", accessor: "tipoPlastico" },
    { header: "Proporción cargada", accessor: "proporcion" },
    { header: "Especificaciones", accessor: "especificaciones" },
  ];

  // Títulos de la tabla incluyendo "Acciones"
  const titles = [...columns.map((col) => col.header), "Acciones"];

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching data from an API
      const fetchedData = [
        {
          ID: 1,
          startTime: "2023-09-16T08:00",
          cantidadCargada: 50,
          tipoPlastico: "Tipo único",
          proporcion: "70% A, 30% B",
          especificaciones: "Color azul",
        },
        {
          ID: 2,
          startTime: "2023-09-17T09:30",
          cantidadCargada: 45,
          tipoPlastico: "Mezcla",
          proporcion: "60% A, 40% B",
          especificaciones: "Color rojo",
        },
        // Add more entries as needed
      ];
      setData(fetchedData);
      setLoading(false);
    }, 2000); // 2-second delay to simulate loading
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Manejar apertura del modal de agregar
  const abrirModal = () => {
    setModalAbierto(true);
  };

  // Manejar cierre del modal de agregar
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  // Manejar apertura del modal de editar
  const abrirModalEdit = (material) => {
    setMaterialId(material.ID);
    setFormValues({
      startTime: material.startTime,
      cantidadCargada: material.cantidadCargada,
      tipoPlastico: material.tipoPlastico,
      proporcion: material.proporcion,
      especificaciones: material.especificaciones,
    });
    setModalEdit(true);
  };

  // Manejar cierre del modal de editar
  const cerrarModalEdit = () => {
    setModalEdit(false);
  };

  // Validación genérica del formulario
  const validateForm = () => {
    let isValid = true;
    if (!formValues.startTime) {
      setMensaje("El Horario de inicio es obligatorio.");
      isValid = false;
    } else if (!formValues.cantidadCargada) {
      setMensaje("La Cantidad cargada es obligatoria.");
      isValid = false;
    } else if (!formValues.proporcion) {
      setMensaje("La Proporción cargada es obligatoria.");
      isValid = false;
    } else if (!formValues.especificaciones) {
      setMensaje("Las Especificaciones son obligatorias.");
      isValid = false;
    }
    return isValid;
  };

  // Manejar envío del formulario para agregar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await addTolva(formValues);
      setModalAbierto(false);
      setMensaje("Registro agregado exitosamente.");
      setData([...data, response.data]);
      // Resetear formulario
      setFormValues({
        startTime: "",
        cantidadCargada: "",
        tipoPlastico: "unico",
        proporcion: "",
        especificaciones: "",
      });
    } catch (error) {
      setMensaje("Error al agregar el registro.");
      console.error("Error al agregar el registro:", error);
    }
  };

  // Manejar envío del formulario para editar
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await editTolva(materialId, formValues);
      setModalEdit(false);
      setMensaje("Registro modificado exitosamente.");
      fetchData();
    } catch (error) {
      setMensaje("Error al modificar el registro.");
      console.error("Error al modificar el registro:", error);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Totales
  const totalVolumen = data.reduce(
    (acc, material) => acc + parseFloat(material.cantidadCargada || 0),
    0
  );
  const totalItems = data.length;

  return (
    <SectionLayout title="Tolva">
      <div className="md:flex flex-row bg-slate-900 min-h-screen">


        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Tolva</h2>
          <AddButton abrirModal={abrirModal} title="Añadir Registro" />
          <PdfGenerator columns={columns} data={data} title="Reporte de Tolva" />
          <ReportButton />

          {/* Mensajes de retroalimentación */}
          {mensaje && (
            <div className="bg-blue-600 text-white py-2 px-4 rounded mb-4">
              {mensaje}
            </div>
          )}

          {/* Modal para agregar */}
          {modalAbierto && (
            <AddModal
              title="Agregar Registro de Tolva"
              fields={[
                {
                  name: "startTime",
                  label: "Horario de inicio",
                  type: "datetime-local",
                  placeholder: "Horario de inicio *",
                },
                {
                  name: "cantidadCargada",
                  label: "Cantidad cargada (kg)",
                  type: "number",
                  placeholder: "Cantidad cargada *",
                },
                {
                  name: "tipoPlastico",
                  label: "Tipo de plástico",
                  type: "select",
                  options: [
                    { value: "unico", label: "Tipo único" },
                    { value: "mezcla", label: "Mezcla" },
                  ],
                },
                {
                  name: "proporcion",
                  label: "Proporción cargada",
                  type: "text",
                  placeholder: "Ej: 70% A, 30% B",
                },
                {
                  name: "especificaciones",
                  label: "Especificaciones",
                  type: "text",
                  placeholder: "Detalles específicos *",
                },
              ]}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cerrarModal={cerrarModal}
              values={formValues}
            />
          )}

          {/* Modal para editar */}
          {/* {modalEdit && (
            <ButtonEdit
              title="Editar Registro de Tolva"
              fields={[
                {
                  name: "startTime",
                  label: "Horario de inicio",
                  type: "datetime-local",
                  placeholder: "Horario de inicio *",
                },
                {
                  name: "cantidadCargada",
                  label: "Cantidad cargada (kg)",
                  type: "number",
                  placeholder: "Cantidad cargada *",
                },
                {
                  name: "tipoPlastico",
                  label: "Tipo de plástico",
                  type: "select",
                  options: [
                    { value: "unico", label: "Tipo único" },
                    { value: "mezcla", label: "Mezcla" },
                  ],
                },
                {
                  name: "proporcion",
                  label: "Proporción cargada",
                  type: "text",
                  placeholder: "Ej: 70% A, 30% B",
                },
                {
                  name: "especificaciones",
                  label: "Especificaciones",
                  type: "text",
                  placeholder: "Detalles específicos *",
                },
              ]}
              handleChange={handleChange}
              handleEditSubmit={handleEditSubmit}
              cerrarModalEdit={cerrarModalEdit}
              values={formValues}
            />
          )} */}

          {/* Totales */}
          <div className="flex p-2 items-center shadow-md bg-gray-700 text-white flex-1 space-x-4 mb-4 rounded">
            <h5>
              <span className="text-gray-400">Total de registros:</span>
              <span className="ml-1">{totalItems}</span>
            </h5>
            <h5>
              <span className="text-gray-400">Total volumen:</span>
              <span className="ml-1">{totalVolumen.toFixed(2)} kg</span>
            </h5>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
         
              <TablaHead titles={titles} />
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={titles.length} className="text-center py-4">
                      <LoadingTable loading={loading} />
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.ID} className="hover:bg-gray-100">
                      <td className="border-b py-2 px-4">
                        {new Date(item.startTime).toLocaleString()}
                      </td>
                      <td className="border-b py-2 px-4">
                        {item.cantidadCargada} kg
                      </td>
                      <td className="border-b py-2 px-4">{item.tipoPlastico}</td>
                      <td className="border-b py-2 px-4">{item.proporcion}</td>
                      <td className="border-b py-2 px-4">{item.especificaciones}</td>
                      <td className="border-b py-2 px-4 flex justify-center space-x-2">
                        <NextButton />
                        <button
                        onClick={() => abrirModalEdit(1)}
                        className="bg-yellow-700 ml-2 hover:bg-yellow-800 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Modificar
                      </button>
                        <DeleteButton
                          id={item.ID}
                          endpoint={`http://www.trazabilidadodsapi.somee.com/api/Tolva/Borrar/${item.ID}`}
                          updateList={fetchData}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Controles de paginación */}
            <div className="flex justify-between items-center bg-gray-700  p-2 rounded">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mr-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Anterior
              </button>
              <span className="text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 ml-2 rounded ${
                  currentPage >= totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Tolva;
