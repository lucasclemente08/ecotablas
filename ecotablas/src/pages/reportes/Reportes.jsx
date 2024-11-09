import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import DeleteButton from "../../components/buttons/DeleteButton";
import AddModal from "../../components/AddModal";
import ButtonEdit from "../../components/buttons/ButtonEditPr";
import LoadingTable from "../../components/LoadingTable";
import TablaHead from "../../components/Thead";
import ReportButton from "../../components/buttons/ReportButton";
import SectionLayout from "../../layout/SectionLayout";
import { FiCheckCircle } from "react-icons/fi";
const ReportesPage = () => {
  const [reportes, setReportes] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [reporteId, setReporteId] = useState(null);

  const [formValues, setFormValues] = useState({
    Titulo: "",
    Descripcion: "",
    Area: "",
    FechaIncidente: "",
    Estado: "",
  });

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalEdit = (reporte) => {
    setReporteId(reporte.Id_reporte);

    setFormValues({
      Titulo: reporte.Titulo,
      Descripcion: reporte.Descripcion,
      Area: reporte.Area,
      FechaIncidente: reporte.FechaIncidente.slice(0, 10),
      Estado: reporte.Estado,
    });
    setModalEdit(true);
  };

  const cerrarModalEdit = () => setModalEdit(false);

  const handleSubmit = () => {
    axios
      .post("http://localhost:61274/api/Reportes/CrearReporte", formValues)
      .then(() => {
        cerrarModal();
        fetchReportes();
      })
      .catch((error) => console.error("Error al agregar el reporte:", error));
  };

  const handleEditSubmit = () => {
    if (
      !formValues.Titulo ||
      !formValues.Descripcion ||
      !formValues.Area ||
      !formValues.FechaIncidente ||
      !formValues.Estado
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    axios
      .put(
        `http://localhost:61274/api/Reportes/ActualizarReporte/${reporteId}`,
        formValues,
      )
      .then(() => {
        setModalEdit(false);
        setMensaje("Modificación exitosa");
        fetchReportes();
      })
      .catch((error) => console.error("Error al modificar el reporte:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchReportes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:61274/api/Reportes/ListarTodo",
      );
      setReportes(response.data);
    } catch (error) {
      console.error("Error fetching reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);
  const cambiarEstado = async (reporteId, nuevoEstado) => {
    try {
      await axios.put(
        `http://localhost:61274/api/Reportes/ActualizarReporte/${reporteId}`,
        { Estado: nuevoEstado },
      );
      fetchReportes();
    } catch (error) {
      console.error("Error al cambiar el estado del reporte:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(reportes.length / itemsPerPage);

  const title = [
    "Título",
    "Descripción",
    "Área",
    "Fecha del incidente",
    "Estado",
    "Acciones",
  ];
  const columns = [
    { header: "Título", dataKey: "Titulo" },
    { header: "Descripción", dataKey: "Descripcion" },
    { header: "Área", dataKey: "Area" },
    { header: "Fecha del incidente", dataKey: "FechaIncidente" },
    { header: "Estado", dataKey: "Estado" },
  ];

  const fields = [
    { name: "Titulo", label: "Título", type: "text", placeholder: "Título *" },
    {
      name: "Descripcion",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción *",
    },
    { name: "Area", label: "Área", type: "text", placeholder: "Área *" },
    {
      name: "FechaIncidente",
      label: "Fecha del incidente",
      type: "date",
      placeholder: "Fecha *",
    },
    { name: "Estado", label: "Estado", type: "text", placeholder: "Estado *" },
  ];

  return (
    <>
      <SectionLayout title="Reportes">
        <ReportButton />

        <PdfGenerator
          columns={columns}
          data={reportes}
          title="Reporte de Problemas"
        />

        {modalAbierto && (
          <AddModal
            title="Agregar Reporte"
            fields={fields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cerrarModal={cerrarModal}
            values={formValues}
          />
        )}

        {modalEdit && (
          <ButtonEdit
            title="Editar Reporte"
            fields={fields}
            id={reporteId}
            formValues={formValues}
            handleChange={handleChange}
            handleEditSubmit={handleEditSubmit}
            cerrarModalEdit={cerrarModalEdit}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <LoadingTable loading={loading} />
            <TablaHead titles={title} />
            <tbody className="bg-white">
              {currentItems.map((reporte) => (
                <tr key={reporte.Id_reporte} className="hover:bg-gray-100">
                  <td className="border-b py-2 px-4">{reporte.Titulo}</td>
                  <td className="border-b py-2 px-4">{reporte.Descripcion}</td>
                  <td className="border-b py-2 px-4">{reporte.Area}</td>
                  <td className="border-b py-2 px-4">
                    {reporte.FechaIncidente.slice(0, 10)}
                  </td>
                  <td className="border-b py-2 px-4">
                    {reporte.Estado}

                    <button
                      className="ml-2 flex items-center text-green-600 hover:text-green-800"
                      onClick={() =>
                        cambiarEstado(reporte.Id_reporte, "Resuelto")
                      }
                    >
                      <FiCheckCircle size={20} />
                    </button>
                  </td>
                  <td className="py-2 px-4 flex justify-center">
                    <button
                      className="bg-yellow-600 ml-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => abrirModalEdit(reporte)}
                    >
                      Modificar
                    </button>
                    <DeleteButton
                      id={reporte.Id_reporte}
                      endpoint="http://localhost:61274/api/Reportes/EliminarReporte"
                      updateList={fetchReportes}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginación */}
          <div className="flex justify-between items-center bg-gray-700">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 ml-2 hover:text-gray-400 text-white rounded-l"
            >
              Anterior
            </button>
            <span className="text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 hover:text-gray-400 text-white rounded-r"
            >
              Siguiente
            </button>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export default ReportesPage;
